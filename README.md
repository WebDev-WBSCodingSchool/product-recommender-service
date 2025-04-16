# 📦 Product Recommender Service

A simple Express-based microservice that provides product recommendations using OpenAI with function calling. This service connects to a fake store API to fetch product data and uses an LLM to provide personalized recommendations based on user prompts.

---

## 🧠 Overview

This service takes a user prompt (e.g. "Gifts recommendations for my wife") and leverages OpenAI's function-calling to fetch relevant products and generate a meaningful recommendation.

---

## 📁 Project Structure

```
.
├── README.md
├── package-lock.json
├── package.json
├── src
│   ├── app.ts
│   ├── controllers
│   │   └── recommendations.ts
│   ├── middlewares
│   │   └── errorHandler.ts
│   ├── routes
│   │   └── recommendRoute.ts
│   ├── schemas
│   │   └── zodSchemas.ts
│   ├── services
│   │   ├── openAIService.ts
│   │   └── productsService.ts
│   └── types
│       └── index.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### 🛠️ Installation

Clone the repository and install dependencies:

```bash
git clone git@github.com:WebDev-WBSCodingSchool/product-recommender-service.git
cd product-recommender-service
npm ci
```

### 🔐 Environment Variables

For development, create a `.env` file in the root with the following variables:

```
OPENAI_MODEL=gpt-4.1
OPENAI_API_KEY=your_openai_api_key_here
PORT=8080
```

In production, make sure they are declared. `OPENAI_MODEL` defaults to `gpt-4.1` and `PORT` to `8080`

### 👨‍💻 Development

Run the server in development mode with:

```bash
npm run dev
```

This will start the TypeScript compiler in watch mode and start the application from the `dist` directory.

### 🏁 Production

Start the server with:

```bash
npm start
```

This will emmit the compiled TypeScript project into the `dist` directory and start the server.

### 📬 API Endpoint

`POST /api/recommend`

Request Body

```json
{
  "prompt": "Gifts recommendations for my wife"
}
```

Response

```json
{
  "message": "Here are some thoughtful gift ideas for your wife that could make her feel special and appreciated. Each of these items offers something unique, whether it's about elegance, utility, or comfort.",
  "products": [
    {
      "id": 5,
      "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
      "price": 695,
      "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
      "category": "jewelery",
      "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
    }
  ]
}
```

### 🧪 How It Works

The OpenAI model receives your prompt.

If the LLM determines that product data is needed, it uses the `getProducts` function via function calling.

Products are fetched from the Fake Store API.

A second OpenAI call processes the products and generates a structured recommendation.

### 🧰 Tech Stack

- Node.js + Express
- TypeScript
- OpenAI SDK
- Zod (for runtime validation)
- Fake Store API (as product data source)

### 📎 Notes

- Error handling is built-in for missing request data and external API failures.
- Responses are structured with clear messages and a product list.

### 🧑‍💻 Author

Made with ❤️ by WBS CODING SCHOOL (Jorge actually, but whatever)
