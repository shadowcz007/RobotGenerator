
import { jsonrepair } from 'jsonrepair'
const APIURL = 'https://api.siliconflow.cn'

// 判断是否有中文
export function containsChinese(str: string) {
    const chineseRegex = /[\u4e00-\u9fa5]/
    return chineseRegex.test(str)
}

export const llmData = (
    content: any,
    temperature = 0.25,
    max_tokens = 1512,
    json_object = false,
    systemPrompt = null
) => {
    let messages = [
        {
            role: 'user',
            content
        }
    ]
    if (systemPrompt) {
        messages = [
            {
                role: 'system',
                content: systemPrompt
            },
            ...messages
        ]
    }

    let d: any = {
        model: 'THUDM/glm-4-9b-chat', //'01-ai/Yi-1.5-9B-Chat-16K',
        messages,
        stream: false,
        max_tokens,
        temperature,
        top_p: 0.7,
        top_k: 50,
        frequency_penalty: 0.5,
        n: 1
    }

    if (json_object)
        d.response_format = {
            type: 'json_object'
        }

    return JSON.stringify(d)
}

export async function generateText(prompt: string, apiKey: string, temperature = 0.25,
    max_tokens = 1512,
    json_object = false,
    systemPrompt: any = null) {
    const body = llmData(
        prompt,
        temperature,
        max_tokens,
        json_object,
        systemPrompt
    );
    const options1 = {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: body
    };
    // console.log("#apikey",apiKey)
    try {
        const response = await fetch(`${APIURL}/v1/chat/completions`, options1);
        const res = await response.json();
        let content = res.choices[0].message.content
        if (json_object) {
            content = jsonrepair(content.trim())
            content = JSON.parse(content)
        }
        return content
    } catch (err) {
        console.log(err);
    }
    return
}

export async function moreSimilarText(texts: any, apiKey: string) {
    let data = await generateText(JSON.stringify(texts),
        apiKey,
        0.6,
        2048,
        true,
        `
        根据提供的示例文本，创建更多在同一个类别下面的不同子类变体。

        Output Format
        =============

        JSON格式，包含与示例类似的子类变体，每个子类以双引号包围。

        Examples
        ========

        *   输入: [ '显示像素化表情的CRT', '显示简单图案的LED矩阵', '高分辨率图形的OLED屏幕', '可变文本的电子墨水显示屏', '全息投影' ]
        *   输出: {  
            "result": [  
            "曲面屏幕的AMOLED显示",  
            "背光式LCD屏幕",  
            "微型投影仪",  
            "激光显示技术",  
            "透明显示屏"  
            ]  
            }

        Notes
        =====

        *   保持所有子类在同一类别下。
        *   确保每个子类的描述都清晰且具有独特性。`.trim()
    )
    if (data && data.result) {
        return data.result
    }
    return
}

export async function translateToEn(data: string, apiKey: string) {
    if (containsChinese(data)) {
        let text = await generateText(`Translate '''${data}''' into English, and do not output any other irrelevant information,ensuring the sentence has a coherent and logical structure.`,
            apiKey,
            0.25,
            2048
        )
        if (text) return text
    }
    return
}

export async function writeXHSText(texts: any, apiKey: string) {
    let data = await generateText(JSON.stringify(texts),
        apiKey,
        0.6,
        3048,
        false,
        `
        根据提供的文字，合理修改，并补充细节，调整语气，写出用于发布到小红书的文案。

        Steps
        =====

        1.  **理解提供的文字**：阅读并理解用户提供的文字内容。
        2.  **合理修改**：根据内容进行合理的修改，确保文案更加吸引人和适合小红书平台。
        3.  **补充细节**：增加必要的细节，使文案更为完整和有说服力。
        4.  **调整语气**：根据小红书的用户群体，调整文案的语气，使其更为亲切和贴近读者。
        5.  **输出JSON格式**：将最终的文案以JSON格式输出。

        Output Format
        =============

        输出格式为JSON，包含一个键值对，其中键为"result"，值为修改后的小红书文案。

        Examples
        ========

        **输入**：  
        "今天去了一个超棒的咖啡馆，环境非常好，咖啡也很好喝，推荐大家去试试！"

        **输出**：

        {
        "result": "今天打卡了一家超赞的咖啡馆！环境超级棒，满满的文艺气息，咖啡香醇浓郁，真的是每一口都是享受。强烈推荐给爱咖啡的小伙伴们，赶紧去试试吧！📍[咖啡馆地址]"
        }
        

        Notes
        =====

        *   确保文案内容适合发布在小红书，符合平台的调性。
        *   可以根据具体的文字内容增加适当的表情符号和标签。`.trim()
    );

    try {
        if (data) {
            data = data.match(/{[^]*}/)[0]
            data = jsonrepair(data.trim())
            data = JSON.parse(data)
        }
    } catch (error) {
        console.log(error)
    }

    if (data && data.result) {
        return data.result
    }
    return
}

export async function generateImage(prompt: string, apiKey: string) {
    const options = {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "model": "black-forest-labs/FLUX.1-schnell",
            "prompt": prompt,
            "image_size": "1024x1024"
        })
    };

    try {
        const response = await fetch(`${APIURL}/v1/image/generations`, options);
        const data = await response.json();
        console.log(data);
        return data.images[0].url
    } catch (err) {
        console.error(err);
    }
    return
}
