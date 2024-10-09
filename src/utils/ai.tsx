
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
        0.25,
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
