export interface Robot {
  head: {
    color: string;
    shape: string;
    details: {
      screen: string;
      buttons_and_knobs: string;
    };
  };
  body: {
    clothing: string;
    accessories: string;
  };
  overall_style: {
    color_tone: string;
    material: string;
  };
}
const headColors = [
  "带有淡黄色调的白色",
  "金属银",
  "哑光黑",
  "光泽白",
  "拉丝铝",
];

const headShapes = [
  "圆角方形",
  "椭圆形",
  "圆柱形",
  "六边形",
  "圆顶形",
];

const screenTypes = [
  "显示像素化表情的CRT",
  "显示简单图案的LED矩阵",
  "高分辨率图形的OLED屏幕",
  "可变文本的电子墨水显示屏",
  "全息投影",
];

const buttonTypes = [
  "散布在头部周围的物理按钮和旋钮",
  "侧面的触敏面板",
  "复古风格的拨动开关",
  "发光的按键",
  "旋转拨盘和滑块",
];

const clothingStyles = [
  "20世纪中期时尚，高腰裤和细领带",
  "带有发光装饰的未来派连身衣",
  "蒸汽朋克风格的背心和长裤",
  "带有几何图案的极简主义长袍",
  "复古太空服，带有笨重的关节",
];

const accessoryTypes = [
  "腰带上附有磁带和软盘",
  "胸前的发光能量核心",
  "肩部的可伸缩天线",
  "装满小工具的多功能口袋",
  "手腕上的全息投影仪",
];

const colorTones = [
  "柔和、低调的色调",
  "鲜艳的霓虹色",
  "朴实、自然的色调",
  "单色灰度",
  "粉彩色调",
];

const materials = [
  "类似旧电子设备的纹理",
  "光滑、抛光的表面",
  "风化和磨损的金属",
  "内部发光的半透明塑料",
  "带有电路图案的织物纹理",
];



function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateRandomRobot(): Robot {
  return {
    head: {
      color: getRandomElement(headColors),
      shape: getRandomElement(headShapes),
      details: {
        screen: getRandomElement(screenTypes),
        buttons_and_knobs: getRandomElement(buttonTypes),
      },
    },
    body: {
      clothing: getRandomElement(clothingStyles),
      accessories: getRandomElement(accessoryTypes),
    },
    overall_style: {
      color_tone: getRandomElement(colorTones),
      material: getRandomElement(materials),
    },
  };
}