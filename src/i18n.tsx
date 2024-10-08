// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 定义翻译资源
const resources = {
  en: {
    translation: {
      "Head": "Head",
      "Color": "Color",
      "Shape": "Shape",
      "Details": "Details",
      "Screen": "Screen",
      "Buttons and Knobs": "Buttons and Knobs",
      "Body": "Body",
      "Legs": "Legs",
      "Clothing": "Clothing",
      "Accessories": "Accessories",
      "Overall Style": "Overall Style",
      "Color Tone": "Color Tone",
      "Material": "Material",
      "Randomize All": "Randomize All",
      "Generate Image": "Generate Image",
      "Composition": "Composition",
      "Basic": "Basic"
    }
  },
  zh: {
    translation: {
      "Head": "头部",
      "Color": "颜色",
      "Shape": "形状",
      "Details": "细节",
      "Screen": "屏幕",
      "Buttons and Knobs": "按钮和旋钮",
      "Body": "身体",
      "Legs": "下半身",
      "Clothing": "衣服",
      "Accessories": "配件",
      "Overall Style": "整体风格",
      "Color Tone": "色调",
      "Material": "材质",
      "Composition": "构图",
      "Randomize All": "随机化全部",
      "Generate Image": "生成图像",
      "Basic": "基础款"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh', // 默认语言
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
