import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// 1. 在 ES Module 模式下获取当前文件的路径，并加载项目最外层根目录下的 .env 文件
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// 2. 初始化 OpenAI 客户端，传入 DeepSeek 的配置
const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL,
});

// 3. 发起对话请求
async function main() {
  try {
    const response = await client.chat.completions.create({
      model: "deepseek-chat", // DeepSeek 通用对话模型
      messages: [
        { role: "system", content: "你是一个简洁的 AI 助手。" },
        { role: "user", content: "你好，请用一句话介绍你自己。" },
      ],
      temperature: 0.7,
    });

    // 4. 打印返回的文本内容
    console.log("AI 的回答：");
    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error("请求失败：", error);
  }
}

main();
