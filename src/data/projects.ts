// src/data/projects.ts

export interface Project {
  slug: string;
  title: string;
  summary: string;
  tech?: string[];
  github?: string;
  quantconnect?: string; // ← NEW
  demo?: string;
  content: string;
  presentation?: string; // Optional field for presentation link
}
  
  export const projects: Project[] = [
    // Levered Beta Trend Algorithm
    {
      slug: 'levered-beta-trend',
      title: 'Levered Beta Trend Algorithm',
      summary: 'An intraday market-neutral strategy based on time-varying beta estimation.',
      tech: ['Python', 'Pandas', 'Alphalens'],
      github: 'https://github.com/nilesh-mukherji/levered_beta_trader',
      content: `
 # 📊 Momentum Strategy Using SPXL with Volatility Filter

[![Python](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/)
[![QuantConnect](https://img.shields.io/badge/platform-QuantConnect-black)](https://www.quantconnect.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

This project implements a simple momentum-based trading strategy on **SPXL**, a 3x leveraged ETF tracking the S&P 500. The strategy uses short- and long-term momentum indicators combined with a volatility filter to time entries and exits.

---

## 📌 Strategy Overview

- **Instrument**: \`SPXL\` (3x leveraged S&P 500 ETF)
- **Capital**: \$1,000,000
- **Backtest Start**: Dec 23, 2009
- **Resolution**: Daily
- **Leverage**: 8x
- **Execution Platform**: QuantConnect Lean Framework

---

## ⚙️ How It Works

### 🧠 Core Logic

1. **Daily Rebalancing**
   - Rebalances near market close each day at 15:58.

2. **Momentum Signal**
   - Compares short-term (5-day) and long-term (27-day) rolling volatility-adjusted mean returns.
   - Enters a long position if the short-term mean is below the long-term mean.
   - Exits when the signal reverses.

3. **Volatility Filter**
   - If rolling volatility exceeds a dynamic threshold (22.5%), the strategy **exits all positions** and waits for calmer conditions.

4. **Charting**
   - Custom plots display price, signals, and volatility bands.

---

## 🧮 Indicators Used

- **Volatility-Adjusted Means**:
  \$\$ \\mu = \\bar{r} \\cdot \\sigma \\cdot \\sqrt{252 / N} \$\$

- **Volatility Bands**:  
  Uses rolling window of 27 days to compute:
  - Standard deviation of daily returns × 500
  - Adds/subtracts this value from a base level (100) for plotting

---

## 📁 Repository Structure

\`\`\`
.
├── MomentumStrategy.py     # Core trading algorithm (Lean-compatible)
├── README.md               # Project documentation
├── LICENSE                 # MIT license
\`\`\`

---

## 🚀 Getting Started

### Run in QuantConnect Cloud

1. Copy \`MomentumStrategy.py\` into a new QuantConnect project.
2. Run backtest and observe results + charts.

### Run Locally with Lean CLI

\`\`\`bash
pip install lean
lean create "MomentumStrategy"
# Replace generated file with contents of MomentumStrategy.py
lean backtest "MomentumStrategy"
\`\`\`

---

## 📈 Example Chart Output

- SPY Close price
- Long/Short term volatility-adjusted means
- Buy/Sell markers
- Volatility bounds

---

## 🧠 Potential Improvements

- Add **shorting logic** when signal reverses
- Test on other leveraged/non-leveraged ETFs
- Incorporate **regime detection** for risk-on/risk-off
- Add transaction cost modeling

---

## 🧑‍💻 Author

Built with 💡 by Nilesh. Contributions welcome!

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

      `,
    },
    // Sector Statistical Arbitrage
    {
      slug: 'sector-arbitrage',
      title: 'Sector Statistical Arbitrage',
      summary: 'Pairs trading and sector convergence strategy',
      tech: ['Python', 'statsmodels', 'QuantConnect'],
      github: 'https://github.com/nilesh-mukherji/pair_trader',
      content: `
      # 📈 Kalman Pairs Trading Strategy

[![Python](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![QuantConnect](https://img.shields.io/badge/platform-QuantConnect-black)](https://www.quantconnect.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

This project implements a robust statistical arbitrage strategy for trading mean-reverting pairs. It combines the **Engle-Granger cointegration test** with a **Kalman filter** to dynamically track the spread between two sector ETFs and execute trades based on statistically significant deviations.

---

## 📊 Strategy Overview

- **Backtest Period**: Jan 1, 2019 – Jan 1, 2023  
- **Capital**: $1,000,000  
- **Assets**: \`XLK\` (Tech), \`XLU\` (Utilities)  
- **Resolution**: Minute  
- **Approach**: Cointegration-based mean reversion  
- **Signal Smoothing**: Kalman filter  
- **Execution**: QuantConnect Lean Framework

---

## ⚙️ How It Works

### ✅ Recalibration (Weekly)
- Performs an **Engle-Granger cointegration test**.
- If cointegrated, computes the spread and cointegrating vector.
- Trains a **Kalman Filter** on recent spread data.
- Estimates a trading threshold using a **smoothed empirical survival function**.

### 📈 Daily Signal Evaluation
- Updates spread using the most recent prices.
- Applies Kalman filter to update the mean estimate.
- Checks whether the normalized spread crosses the threshold:
  - If below \`-threshold\`: **Go long spread**.
  - If above \`+threshold\`: **Go short spread**.
  - If reverting: **Exit position**.

---

## 📁 Repository Structure

\`\`\`
.
├── PCADemo.py         # Core algorithm code (QuantConnect-style)
├── README.md          # This file
├── LICENSE            # MIT License
\`\`\`

---

## 🚀 Getting Started

### 🔧 Prerequisites

To run this locally with [QuantConnect Lean CLI](https://github.com/QuantConnect/Lean):

\`\`\`bash
# Clone this repository
git clone https://github.com/nilesh-mukherji/pair_trader.git
cd pair_trader

# Install Lean CLI if not already installed
pip install lean

# Run the backtest (you must have a QuantConnect account configured)
lean backtest "KalmanTrader"
\`\`\`

Alternatively, run the code directly in QuantConnect's cloud environment by copying the contents of \`pairs_trader.py\`.

---

## 🧠 Key Concepts

- **Cointegration**: Statistical relationship between two non-stationary time series that form a stationary linear combination.
- **Kalman Filter**: A recursive filter to estimate the dynamic mean of the spread.
- **Empirical Thresholding**: Uses a smoothed empirical function to identify significant deviations in spread.

---

## 📉 Performance

The strategy is designed to perform best during range-bound markets where the relationship between the selected ETFs remains stable. Performance results will vary depending on parameter choices and asset selection.

---

## 🔬 Future Enhancements

- Add **PCA-based ETF universe reduction**
- Adaptive **regime detection** for threshold scaling
- Robust **risk management** (volatility scaling, stop-losses)
- Integrate **optimization frameworks** for cointegration weights

---

## 🤝 Contributing

Pull requests are welcome! If you'd like to contribute:
1. Fork this repo.
2. Create your feature branch (\`git checkout -b feature/foo\`).
3. Commit your changes.
4. Push to the branch (\`git push origin feature/foo\`).
5. Open a pull request.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

If you have questions, ideas, or feedback, feel free to open an issue or reach out via GitHub.`,
    },
    // Delta Hedging with Reinforcement Learning
    {
      slug: 'rl-delta-hedge',
      title: 'TensorFlow TD3 Delta Hedge',
      summary: 'Reinforcement learning-based delta hedging strategy using TensorFlow.',
      tech: ['Python', 'TensorFlow', 'Reinforcement Learning'],
      github: 'https://colab.research.google.com/drive/1Kz0msjSqRUAvM9otD6cOX3PFrc-LVV4M?usp=sharing',
      content: `
      # 🤖 Delta Hedging with Reinforcement Learning

[![Python](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/)
[![RL](https://img.shields.io/badge/method-RL--based-green)](https://github.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

This project demonstrates the use of **Reinforcement Learning (RL)** for optimizing delta hedging strategies in options trading. It simulates a custom market environment and applies actor-critic algorithms to train an agent capable of minimizing hedging error and trading costs.

---

## 📈 Objective

The goal is to teach an RL agent to dynamically hedge a European call option by adjusting the delta exposure of a portfolio over time, optimizing for:

- **Minimal P&L variance**
- **Reduced transaction costs**
- **Improved hedging performance compared to standard Black–Scholes delta hedging**

---

## 🧠 Core Components

### 🏦 Environment: \'DeltaHedgingEnv\'

A custom Gym environment with:
- **State**: [underlying price, current hedge, option delta]
- **Action**: Adjust hedge position ([-20, 20])
- **Reward**: Negative cost or error in hedge effectiveness

### ⚙️ Key Features
- Simulates option greeks using **Black-Scholes**
- Discrete-time market evolution
- Supports stochastic underlying price movement
- Incorporates transaction cost penalty

### 🧪 Model Architecture
- Actor-Critic framework built with **PyTorch**
- Neural networks approximate both policy (actor) and value (critic)
- Custom training loop with exploration and reward tracking

---

## 📊 Visual Output

- P&L distributions over episodes
- Hedging position over time
- Reward progression (training curves)

---

## 📁 Project Structure

\'\'\'
.
├── Delta_Hedging_RL.ipynb     # Main Jupyter notebook
├── README.md                  # Project documentation
├── LICENSE                    # License (MIT recommended)
\'\'\'

---

## 🚀 Getting Started

### 📦 Requirements

Install Python dependencies:

\'\'\'bash
pip install numpy torch gym matplotlib scipy
\'\'\'

### ▶️ Run the Notebook

\'\'\'bash
jupyter notebook Delta_Hedging_RL.ipynb
\'\'\'

Train the agent and compare its performance against Black-Scholes delta hedging.

---

## 🧠 Extensions & Ideas

- Use LSTM-based policy networks for temporal modeling
- Add stochastic volatility (e.g., Heston model)
- Integrate transaction cost models or slippage
- Compare multiple RL algorithms (DDPG, PPO, SAC)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

Created with 💡 by Nilesh. Feel free to contribute or reach out!
      `,
    },
    // Weapons Detection with Yolov10
    {
      slug: 'YoloV10-Weapon-Detection',
      title: 'Weapons Detection with Yolov10',
      summary: 'Real-time weapon detection using Yolov10.',
      tech: ['Python', 'Yolov10', 'OpenCV'],
      github: 'https://github.com/nilesh-mukherji/object_detection_realtime',
      content: `
      # Real-Time Object Detection with YOLO and Android Integration

## Overview
This project implements a complete solution for real-time object detection. It includes:
- A deep learning component using YOLO for training, validation, and TF Lite export.
- An Android application that integrates the exported TF Lite model for on-device inference.

## Deep Learning Model Training & TF Lite Export
- Train your custom YOLO model using the provided notebooks.
- Export the trained model to TensorFlow Lite format.
- Review the \`train_export_yolov8_model.ipynb\` and \`Deep_Learning_Project.ipynb\` notebooks for detailed instructions.
- Use the exported \`.tflite\` model along with its labels in the Android app.

## Features
- Real-time object detection on live video feeds.
- High accuracy with YOLOv10 architecture.
- Easy integration with various input sources.
- Optimized for performance and scalability.

## Prerequisites
- Python 3.7+ with necessary libraries (e.g., OpenCV, ultralytics)
- TensorFlow Lite and related dependencies for model export
- Android Studio for building and deploying the Android application

## Installation & Usage
1. Clone the repository:
   \`\`\`
   git clone https://github.com/yourusername/object_detection_realtime.git
   \`\`\`
2. For deep learning tasks:
   - Open and run the provided notebooks to train and export your model.
3. For Android deployment:
   - Place the exported TF Lite model and labels in the specified assets folder.
   - Open the Android project in Android Studio.
   - Build and run the project on your Android device.

## Contributing
Contributions are welcome. Please open issues or submit pull requests for improvements and bug fixes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
# Real-Time Object Detection with YOLO and Android Integration

## Overview
This project implements a complete solution for real-time object detection. It includes:
- A deep learning component using YOLO for training, validation, and TF Lite export.
- An Android application that integrates the exported TF Lite model for on-device inference.

## Deep Learning Model Training & TF Lite Export
- Train your custom YOLO model using the provided notebooks.
- Export the trained model to TensorFlow Lite format.
- Review the \`train_export_yolov8_model.ipynb\` and \`Deep_Learning_Project.ipynb\` notebooks for detailed instructions.
- Use the exported \`.tflite\` model along with its labels in the Android app.

## Features
- Real-time object detection on live video feeds.
- High accuracy with YOLOv10 architecture.
- Easy integration with various input sources.
- Optimized for performance and scalability.

## Prerequisites
- Python 3.7+ with necessary libraries (e.g., OpenCV, ultralytics)
- TensorFlow Lite and related dependencies for model export
- Android Studio for building and deploying the Android application

## Installation & Usage
1. Clone the repository:
   \`\`\`
   git clone https://github.com/yourusername/object_detection_realtime.git
   \`\`\`
2. For deep learning tasks:
   - Open and run the provided notebooks to train and export your model.
3. For Android deployment:
   - Place the exported TF Lite model and labels in the specified assets folder.
   - Open the Android project in Android Studio.
   - Build and run the project on your Android device.

## Contributing
Contributions are welcome. Please open issues or submit pull requests for improvements and bug fixes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
`,
    },
    // GenAI Portfolio Construction
    {
      slug: 'genai-portfolio-construction',
      title: 'GenAI Portfolio Construction',
      summary: 'AI-driven portfolio construction using Generative AI.',
      tech: ['Python', 'Generative AI', 'Portfolio Management'],
      github: 'https://github.com/nilesh-mukherji/automated_portfolio_constructor',
      demo: 'https://automatedportfolioconstructor-lfyxp2yytbsfdvg9jx5nmh.streamlit.app/',
      content: `
     # **Automated Portfolio Constructor**

The Automated Portfolio Constructor is a Streamlit-based application designed to help users build and analyze investment portfolios dynamically. It provides detailed views of portfolio allocation, individual securities, and performance metrics, with the ability to export session-specific data to PDF.

## **Features**
- **Dynamic Portfolio Visualization**:
  - Interactive charts (e.g., pie charts for allocation).
  - Detailed security analysis with historical performance and rationale.
- **Customizable Reports**:
  - Generate tailored investment summaries for specific portfolios.
  - Export reports and app state to PDF format.
- **Interactive User Experience**:
  - Expandable sections for securities with detailed descriptions.
  - Navigation across multiple cards for securities analysis.
- **Responsive Design**:
  - Optimized layout for charts, tables, and user inputs.

## **Installation**

1. **Clone the Repository**
   \`\`\`bash
   git clone https://github.com/nilesh-mukherji/automated_portfolio_constructor.git
   cd automated_portfolio_constructor
   \`\`\`
  
2. **Install Dependencies**
    Run the following command to install all required dependencies:
    \`\`\`bash
    pip install -r requirements.txt
    \`\`\`
## **Run the Application**

1. Start the Streamlit app:
   \`\`\`bash
   streamlit run app.py
    \`\`\`
2. Open your browser and navigate to Open your browser and navigate to: http://localhost:8501

## **Usage**

### **Portfolio Overview**
- Launch the app and upload your portfolio data in JSON format.
- View portfolio allocation as an interactive pie chart.
- Expand individual securities in the table for detailed insights.

### **Detailed Security View**
- Navigate through a card-based view showing:
  - Historical performance charts.
  - In-depth descriptions of individual securities.

### **Export Options**
- Use the "Generate PDF" button to export the portfolio analysis as a PDF.
`,
    },
    // AS Market Making
    {
      slug: 'as-market-making',
      title: 'Market Making Algorithm',
      summary: 'Automated market making strategy implimenting Avallenia-Stoikov models.',
      tech: ['Python', 'Algo Trading', 'Market Making'],
      github: 'https://github.com/nilesh-mukherji/automated_portfolio_constructor',
      content: 
      `
     # 🧠 Avellaneda-Stoikov Market Making Algorithm

Welcome to my portfolio project on algorithmic trading, where I implement and analyze the **Avellaneda-Stoikov (AS)** model for market making. This project demonstrates how quantitative finance meets algorithmic execution to manage inventory, optimize bid/ask spreads, and respond dynamically to market conditions.

---

## 📌 Overview

This project implements the **Avellaneda-Stoikov (AS) Market Making Algorithm**, a foundational model in high-frequency trading. It simulates a limit order book environment and uses market microstructure theory to manage inventory risk and maximize P&L.

---

## ⚙️ Key Features

- **Inventory-Aware Quoting**: Adjusts bid/ask spreads based on current inventory.
- **Volatility-Adjusted Pricing**: Spreads adapt to market volatility and time to close.
- **Probabilistic Order Execution**: Uses an exponential decay model to reflect execution likelihood.
- **Synthetic Market Environment**: Integrated with a custom simulator and exchange engine.
- **End-of-Day Liquidation**: Positions are automatically closed before the market ends.

---

## 📈 Model Assumptions

- Mid-price follows a **Brownian Motion**
- Order arrivals follow a **Poisson process**
- Execution likelihood decays **exponentially** with spread distance
- Parameters like \`γ\` (risk aversion), \`σ\` (volatility), \`k\` (execution decay), and \`v\` (volume) are estimated from historical data

---

## 🧪 Performance Highlights

- 📊 **Sharpe Ratio**: 5.27  
- 💰 **Profit**: $33.9  
- 💼 **Cash Mean**: $26.3  
- 📉 **NPV Mean**: $35.61  

> These results were achieved in a controlled simulation using realistic microstructure data and assumptions.

---

## 🧩 System Integration

This project is part of a broader simulated exchange environment with the following integrations:

- **Exchange Engine**: Handles matching and order status
- **Simulation Team**: Provides synthetic order book and market message data (\`Messages.csv\`, \`Orderbook.csv\`)
- **Parameter Estimation**: Real-time calibration of \`v\`, \`k\`, \`σ\`, and interarrival times

---

## 🛠️ Areas for Future Improvement

- Expand order class with full tracking (ID, status, fills)
- Transition to lower-latency languages (e.g., C++ for production-grade performance)
- Implement more robust logging and notification systems
- Increase training dataset scope for more generalized performance

---

## 🎥 Demo

A step-by-step walkthrough of the algorithm in action is available in the final section of the PDF or upon request.

---

## 📜 Conclusion

This project reflects a deep dive into market microstructure modeling and showcases my ability to implement, optimize, and explain algorithmic trading strategies that are both **mathematically grounded** and **technically sound**.

---

## 📬 Contact

Feel free to reach out via [your email/linkedin/github] for collaboration, questions, or trading nerdery.

`
    },
    
  ];
  