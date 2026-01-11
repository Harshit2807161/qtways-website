# Q1. What is the goal of the project?

# Ans: I have a skincare startup called QTWAYS and want to revamp its current shopify website to have full code control using MERN stack (mostly react.js + html5 + tailwind css as it mainly contains a banner, product catalog, testimonials and various dropdowns like shop by concern, shop by ingredients, etc as seen on the current shopify version of website hosted on https://qtways.com/). To do this, I want to take mimic everything including fonts, styles, formats, etc [first creating a style guide by capturing the website pages and assessing them] used in [Kimirica](https://www.kimirica.shop/), which is a website for high-end perfumes and skincare. I essentially want to mimic that site by using React, html5, tailwind css. The project would involve:
# 1. Making a prototype of the current existing Kimirica website using Playwright MCP and MERN stack (Most of the pages of both websites are screenshoted from previous session in .playwright-mcp dir, but double check if some are missed and explore them too)
# 2. Then, using that prototype to replace the mock assets with qtways's assets and iterating in improving loops to get all pages of the website right using parallel subagents wherever possible. 

# MVP: Making a prototype for the website using all the styles, fonts, formats used in https://www.kimirica.shop/ and using mock image assets, with textual information and redirect urls like social media, etc sourced from https://qtways.com/ wherever needed. No user login or api integrations.

# V1: Maintain user logins using google API, apple id api, OTP using phone, cart tracking, etc using MERN stack. Also, replace all the images with the assets i will provide. Also work on accessibility features and readibility on different devices. 

# V2: Add a chatbot plugin. Add stripe for payment logic. By this point the website should be fully functional for migration to actual host server. 

