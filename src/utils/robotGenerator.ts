export interface Robot {
  head: {
    color: string
    shape: string
    details: {
      screen: string
      buttons_and_knobs: string
    }
  }
  body: {
    clothing: string
    accessories: string
  }
  legs: {
    style: string
    shoes: string
  }
  overall_style: {
    color_tone: string
    material: string
    composition: string
  }
}

const headColors = [
  '带有淡黄色调的白色',
  '金属银',
  '哑光黑',
  '光泽白',
  '拉丝铝'
]

const headShapes = ['圆角方形', '椭圆形', '圆柱形', '六边形', '圆顶形']

const screenTypes = [
  '显示像素化表情的CRT',
  '显示简单图案的LED矩阵',
  '高分辨率图形的OLED屏幕',
  '可变文本的电子墨水显示屏',
  '全息投影'
]

const buttonTypes = [
  '散布在头部周围的物理按钮和旋钮',
  '侧面的触敏面板',
  '复古风格的拨动开关',
  '发光的按键',
  '旋转拨盘和滑块'
]

const clothingStyles = [
  '20世纪中期时尚，高腰裤和细领带',
  '带有发光装饰的未来派连身衣',
  '蒸汽朋克风格的背心和长裤',
  '带有几何图案的极简主义长袍',
  '复古太空服，带有笨重的关节'
]

const accessoryTypes = [
  '腰带上附有磁带和软盘',
  '胸前的发光能量核心',
  '肩部的可伸缩天线',
  '装满小工具的多功能口袋',
  '手腕上的全息投影仪'
]

const legStyles = [
  '细长的金属腿',
  '带有液压装置的粗壮腿部',
  '履带式腿部',
  '仿生腿',
  '带有喷气推进器的腿'
]

const shoeTypes = [
  '带有轮子的运动鞋',
  '金属靴子',
  '带有磁力吸盘的鞋子',
  '高科技跑鞋',
  '复古皮鞋'
]

const colorTones = [
  '柔和、低调的色调',
  '鲜艳的霓虹色',
  '朴实、自然的色调',
  '单色灰度',
  '粉彩色调'
]

const materials = [
  '类似旧电子设备的纹理',
  '光滑、抛光的表面',
  '风化和磨损的金属',
  '内部发光的半透明塑料',
  '带有电路图案的织物纹理'
]

const compositions = [
  '全身构图',
  '从头部到腰部的上半身构图',
  '从上方俯视拍摄的自拍构图',
  '适合社交媒体头像的正面构图'
]

function getRandomElement<T> (array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

export function getBasic () {
  return {
    head: {
      color: '白色',
      shape: '导角方块',
      details: {
        screen: "显示字母'MIXLAB'",
        buttons_and_knobs: '发光的按键'
      }
    },
    body: {
      clothing: '纯白色印着MIXLAB的毛衣',
      accessories: '手腕上的全息投影仪'
    },
    legs: {
      style: '细长的金属腿',
      shoes: '带有轮子的运动鞋'
    },
    overall_style: {
      color_tone: '柔和、低调的色调',
      material: '类似旧电子设备的纹理',
      composition: '显示整个身体的全身构图'
    }
  }
}

export function generateRandomRobot (): Robot {
  return {
    head: {
      color: getRandomElement(headColors),
      shape: getRandomElement(headShapes),
      details: {
        screen: getRandomElement(screenTypes),
        buttons_and_knobs: getRandomElement(buttonTypes)
      }
    },
    body: {
      clothing: getRandomElement(clothingStyles),
      accessories: getRandomElement(accessoryTypes)
    },
    legs: {
      style: getRandomElement(legStyles),
      shoes: getRandomElement(shoeTypes)
    },
    overall_style: {
      color_tone: getRandomElement(colorTones),
      material: getRandomElement(materials),
      composition: getRandomElement(compositions)
    }
  }
}

export function describeImage (imageData: any) {
  const { head, body, legs, overall_style } = imageData

  const headDescription = `头部颜色为${head.color}，形状为${head.shape}，细节包括${head.details.screen}屏幕和${head.details.buttons_and_knobs}。`
  const bodyDescription = `身体穿着${body.clothing}，戴有${body.accessories}。`
  const legDescription = legs
    ? `腿部为${legs.style}，鞋子为${legs.shoes}。`
    : ''
  const overallStyleDescription = `整体构图为${overall_style.composition}，风格采用${overall_style.color_tone}色调，材质为${overall_style.material}。`

  return `${overallStyleDescription} ${headDescription} ${bodyDescription} ${legDescription}`
}
