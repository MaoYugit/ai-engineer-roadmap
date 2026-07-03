import os
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

# 1. 寻找并加载项目最外层根目录下的 .env 文件
env_path = Path(__file__).resolve().parent.parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

# 2. 初始化 OpenAI 客户端，传入 DeepSeek 的配置
client = OpenAI(
  api_key=os.getenv("DEEPSEEK_API_KEY"),
  base_url=os.getenv("DEEPSEEK_BASE_URL")
)

# 3. 发起对话请求
response = client.chat.completions.create(
  model = "deepseek-chat", # DeepSeek 的通用对话模型
  messages=[
    {"role": "system", "content": "你是一个简洁的 AI 助手。"},
    {"role": "user", "content": "你好，请用一句话介绍你自己。"}
  ],
  temperature = 0.7, # 控制随机性，数值越低回答越严谨
)

# 4. 打印返回的文本内容
print("AI 的回答：")
print(response.choices[0].message.content)