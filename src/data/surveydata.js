// Auto-generated surveyData.js — pretty-printed
export const surveyData = [
  {
    themeId: "1",
    themeName: "Goals",
    description: "Having money goals and a strategy to achieve them give you a direction and a map to get there.",
    questions: [
      {
        id: "1.1",
        text: "Do you have clearly defined money goal(s)?",
        options: [
          { label: "Yes", value: 3, next: "1.1.1" },
          { label: "No", value: 0, next: "2.1" },
        ],
      },
      {
        id: "1.1.1",
        text: "Do you have a strategy to achieve your money goal(s)?",
        options: [
          { label: "Yes", value: 1, next: "1.1.2" },
          { label: "No", value: 0, next: "1.1.2" },
        ],
      },
      {
        id: "1.1.2",
        text: "Are you aligned with partner on your goals and strategy, or don't have a partner?",
        options: [
          { label: "Yes", value: 1, next: "1.1.3" },
          { label: "No", value: 0, next: "1.1.3" },
        ],
      },
      {
        id: "1.1.3",
        text: "Are you (and partner if you have one) clear on how the strategy will work?",
        options: [
          { label: "Yes", value: 1, next: "1.1.4" },
          { label: "No", value: 0, next: "1.1.4" },
        ],
      },
      {
        id: "1.1.4",
        text: "Do you have a system to track how you are progressing towards your goals?",
        options: [
          { label: "Yes", value: 1, next: "1.1.5" },
          { label: "No", value: 0, next: "1.1.5" },
        ],
      },
      {
        id: "1.1.5",
        text: "Do you review your progress and update your strategy at least once per year?",
        options: [
          { label: "Yes", value: 1, next: "2.1" },
          { label: "No", value: 0, next: "2.1" },
        ],
      },
    ],
  },
  {
    themeId: "2",
    themeName: "Wellbeing",
    description: "Financial wellbeing is often defined by feeling you have money to deal with emergencies and that you spend less than you earn so are able to save money towards your goals.",
    questions: [
      {
        id: "2.1",
        text: "Have you established an emergency fund with at least $2000 in it?",
        options: [
          { label: "Yes", value: 2, next: "2.1.1" },
          { label: "No", value: 0, next: "2.2" },
        ],
      },
      {
        id: "2.1.1",
        text: "Is your emergency fund in a separate online savings account (preferably a different bank to your normal bank)?",
        options: [
          { label: "Yes", value: 1, next: "2.1.2" },
          { label: "No", value: 0, next: "2.1.2" },
        ],
      },
      {
        id: "2.1.2",
        text: "Does your emergency fund have 3-6 months of living expenses (more if work/business is less secure)?",
        options: [
          { label: "Yes", value: 1, next: "2.2" },
          { label: "No", value: 0, next: "2.2" },
        ],
      },
      {
        id: "2.2",
        text: "Do you spend less than you earn and therefore saving towards longer term money goals?",
        options: [
          { label: "Yes", value: 4, next: "3.1" },
          { label: "No", value: 0, next: "3.1" },
          { label: "Unsure", value: 0, next: "3.1" },
        ],
      },
    ],
  },
  {
    themeId: "3",
    themeName: "Budget",
    description: "Creating a budget or spending plan is a key enabler of getting on top of your spending and ensuring that you can save.",
    questions: [
      {
        id: "3.1",
        text: "Do you have a budget or spending plan that clearly shows what you plan to spend you money on and keeps you on track to achieve your financial goals?",
        options: [
          { label: "Yes", value: 4, next: "3.1.1" },
          { label: "No", value: 0, next: "4.1" },
        ],
      },
      {
        id: "3.1.1",
        text: "Do you know how much it costs to run your life for a year (i.e. total yearly expenses)?",
        options: [
          { label: "Yes", value: 2, next: "3.1.2" },
          { label: "No", value: 0, next: "3.1.2" },
        ],
      },
      {
        id: "3.1.2",
        text: "Do you know how much you earn and how that is spent on necessities versus lifestyle versus savings?",
        options: [
          { label: "Yes", value: 2, next: "4.1" },
          { label: "No", value: 0, next: "4.1" },
        ],
      },
    ],
  },
  {
    themeId: "4",
    themeName: "Bank Accounts",
    description: "You should setup your banks accounts to organise your money and maximise the amount of it you keep.",
    questions: [
      {
        id: "4.1",
        text: "Do you pay a monthly admin fee on your bank accounts?",
        options: [
          { label: "Yes", value: 0, next: "4.2" },
          { label: "No", value: 2, next: "4.2" },
          { label: "Unsure", value: 0, next: "4.2" },
        ],
      },
      {
        id: "4.2",
        text: "Do you get maximum interest on your savings accounts?",
        options: [
          { label: "Yes", value: 2, next: "4.3" },
          { label: "No", value: 0, next: "4.3" },
          { label: "Unsure", value: 0, next: "4.3" },
        ],
      },
      {
        id: "4.3",
        text: "Do you have separate accounts for spending and savings?",
        options: [
          { label: "Yes", value: 1, next: "4.3.1" },
          { label: "No", value: 0, next: "4.4" },
        ],
      },
      {
        id: "4.3.1",
        text: "Do you have a separate savings account (or sub account) for each of your separate financial goals?",
        options: [
          { label: "Yes", value: 1, next: "4.3.2" },
          { label: "No", value: 0, next: "4.3.2" },
        ],
      },
      {
        id: "4.3.2",
        text: "Do you have separate accounts for needs/necessities versus lifestyle wants?",
        options: [
          { label: "Yes", value: 1, next: "4.4" },
          { label: "No", value: 0, next: "4.4" },
        ],
      },
      {
        id: "4.4",
        text: "If you have your own business, do you keep your business accounts separate from your personal accounts?",
        options: [
          { label: "Yes", value: 1, next: "5.1" },
          { label: "No", value: 0, next: "5.1" },
          { label: "N/A", value: 1, next: "5.1" },
        ],
      },
    ],
  },
  {
    themeId: "5",
    themeName: "Consumer debt",
    description: "Consumer debt eats away at your ability save and encourages you to live beyond your means.",
    questions: [
      {
        id: "5.1",
        text: "In the last two years have you had any credit cards (e.g. Visa, Mastercard, Amex, Other)?",
        options: [
          { label: "Yes", value: 0, next: "5.1.1" },
          { label: "No", value: 2, next: "5.2" },
        ],
      },
      {
        id: "5.1.1",
        text: "Have you paid any interest on any of  your credit cards in the last two years?",
        options: [
          { label: "Yes", value: 0, next: "5.1.2" },
          { label: "No", value: 1, next: "5.1.2" },
          { label: "Unsure", value: 0, next: "5.1.2" },
        ],
      },
      {
        id: "5.1.2",
        text: "Do you know the interest rate for any credit cards you have had over the last two years",
        options: [
          { label: "Yes", value: 1, next: "5.2" },
          { label: "No", value: 0, next: "5.2" },
        ],
      },
      {
        id: "5.2",
        text: "In the last two years have you had any Buy Now Pay Later purchases (e.g. Afterpay, ZipPay, etc)?",
        options: [
          { label: "Yes", value: 0, next: "5.2.1" },
          { label: "No", value: 2, next: "5.3" },
        ],
      },
      {
        id: "5.2.1",
        text: "Did you pay any late or other fees on any of your Buy Now Pay Later loans?",
        options: [
          { label: "Yes", value: 0, next: "5.3" },
          { label: "No", value: 1, next: "5.3" },
          { label: "Unsure", value: 0, next: "5.1.2" },
        ],
      },
      {
        id: "5.3",
        text: "In the last two years have you had any personal loans, car loans or payday loans (e.g. Nimble, Wallet Wizard, etc)?",
        options: [
          { label: "Yes", value: 0, next: "5.3.1" },
          { label: "No", value: 2, next: "5.4" },
        ],
      },
      {
        id: "5.3.1",
        text: "Do you know the interest rate for any personal, car or payday loans you have had over the last two years?",
        options: [
          { label: "Yes", value: 1, next: "5.4" },
          { label: "No", value: 0, next: "5.4" },
        ],
      },
      {
        id: "5.4",
        text: "In the last two years have you borrowed any money from Family or Friends",
        options: [
          { label: "Yes", value: 0, next: "6.1" },
          { label: "No", value: 2, next: "6.1" },
        ],
      },
    ],
  },
  {
    themeId: "6",
    themeName: "Housing",
    description: "Having stable affordable housing is an important pillar of having financial wellbeing",
    questions: [
      {
        id: "6.1",
        text: "Are you in a stable housing situation (e.g. Home Owner, Renting, Living with parents, other)?",
        options: [
          { label: "Yes", value: 4, next: "6.1.1" },
          { label: "No", value: 0, next: "7.1" },
        ],
      },
      {
        id: "6.1.1",
        text: "Are you paying less than 30% of your income towards mortgage, rent or board?",
        options: [
          { label: "Yes", value: 4, next: "7.1" },
          { label: "No", value: 0, next: "7.1" },
          { label: "Unsure", value: 0, next: "7.1" },
        ],
      },
    ],
  },
  {
    themeId: "7",
    themeName: "Superannuation",
    description: "Superannuation is a key pillar for having a financially secure and comfortable retirement. The earlier you get it sorted the more likely it is to serve you well.",
    questions: [
      {
        id: "7.1",
        text: "Are you on track to acheive a comfortable living standard in retirement?",
        options: [
          { label: "Yes", value: 2, next: "7.2" },
          { label: "No", value: 0, next: "7.2" },
          { label: "Unsure", value: 0, next: "7.2" },
        ],
      },
      {
        id: "7.2",
        text: "Are you salary sacrificing 3% or more of your salary to your super account?",
        options: [
          { label: "Yes", value: 2, next: "7.3" },
          { label: "No", value: 0, next: "7.3" },
        ],
      },
      {
        id: "7.3",
        text: "Do you have more than one super account?",
        options: [
          { label: "Yes", value: 0, next: "7.4" },
          { label: "No", value: 2, next: "7.4" },
          { label: "Unsure", value: 0, next: "7.4" },
        ],
      },
      {
        id: "7.4",
        text: "Does your investments inside super match your risk profile and stage of life?",
        options: [
          { label: "Yes", value: 2, next: "8.1" },
          { label: "No", value: 0, next: "8.1" },
          { label: "Unsure", value: 0, next: "8.1" },
        ],
      },
    ],
  },
  {
    themeId: "8",
    themeName: "Career-Business",
    description: "You usually derive most of your income from your career or business. Is it doing its job well for you?",
    questions: [
      {
        id: "8.1",
        text: "Do you have good career prospects?",
        options: [
          { label: "Yes", value: 2, next: "8.2" },
          { label: "No", value: 0, next: "8.2" },
          { label: "Unsure", value: 0, next: "8.2" },
        ],
      },
      {
        id: "8.2",
        text: "Do you continue to learn, develop and educate yourself to further your career?",
        options: [
          { label: "Yes", value: 2, next: "8.3" },
          { label: "No", value: 0, next: "8.3" },
        ],
      },
      {
        id: "8.3",
        text: "Are you satisfied with the income you get from the efforts your exert to receive it?",
        options: [
          { label: "Yes", value: 2, next: "8.4" },
          { label: "No", value: 0, next: "8.4" },
        ],
      },
      {
        id: "8.4",
        text: "If you run your own business, are you satisfied that the business is relatively sound and has longevity?",
        options: [
          { label: "Yes", value: 2, next: "9.1" },
          { label: "No", value: 0, next: "9.1" },
          { label: "N/A", value: 2, next: "9.1" },
        ],
      },
    ],
  },
  {
    themeId: "9",
    themeName: "Insurances",
    description: "Having good insurance ensures that unfortunate events don't take you down.",
    questions: [
      {
        id: "9.1",
        text: "Do you, and your partner if you have one, have life insurance?",
        options: [
          { label: "Yes", value: 2, next: "9.2" },
          { label: "No", value: 0, next: "9.2" },
        ],
      },
      {
        id: "9.2",
        text: "Do you, and your partner if you have one, have Total Permanent Disablement insurance?",
        options: [
          { label: "Yes", value: 2, next: "9.3" },
          { label: "No", value: 0, next: "9.3" },
        ],
      },
      {
        id: "9.3",
        text: "Do you, and your partner if you have one, have income protection insurance?",
        options: [
          { label: "Yes", value: 2, next: "9.4" },
          { label: "No", value: 0, next: "9.4" },
        ],
      },
      {
        id: "9.4",
        text: "If you own your own house, with or without a mortgage, do you have home insurance?",
        options: [
          { label: "Yes", value: 2, next: "10.1" },
          { label: "No", value: 0, next: "10.1" },
        ],
      },
    ],
  },
  {
    themeId: "10",
    themeName: "Estate planning",
    description: "Having an appropriate will and powers of attorney will ensure that you and your assets end up where you want.",
    questions: [
      {
        id: "10.1",
        text: "Do you, and your partner if you have one, have a properly prepared and signed will?",
        options: [
          { label: "Yes", value: 4, next: "10.2" },
          { label: "No", value: 0, next: "10.2" },
        ],
      },
      {
        id: "10.2",
        text: "Do you, and your partner if you have one, have a properly signed medical and financial power of attorney?",
        options: [
          { label: "Yes", value: 4, next: "11.1" },
          { label: "No", value: 0, next: "11.1" },
        ],
      },
    ],
  },
  {
    themeId: "11",
    themeName: "Financial Literacy",
    description: "Financial literacy is key to understanding money and being better at it.",
    questions: [
      {
        id: "11.1",
        text: "Would you consider yourself to be financial literate, understanding interest, compound interest, investment risk?",
        options: [
          { label: "Yes", value: 2, next: "11.2" },
          { label: "No", value: 0, next: "11.2" },
        ],
      },
      {
        id: "11.2",
        text: "Are you confident you could select and work with a financial advisor, mortgage broker or accountant?",
        options: [
          { label: "Yes", value: 2, next: "11.3" },
          { label: "No", value: 0, next: "11.3" },
        ],
      },
      {
        id: "11.3",
        text: "Do you continue to educate yourself about personal finances through (e.g. books, podcasts, news, courses)?",
        options: [
          { label: "Yes", value: 4, next: "12.1" },
          { label: "No", value: 0, next: "12.1" },
        ],
      },
    ],
  },
  {
    themeId: "12",
    themeName: "Security",
    description: "It's hard work to earn money, and it's important you protect it from bad actors that would like to take it from you",
    questions: [
      {
        id: "12.1",
        text: "Do you use different passwords on all sites (preferably using a password manager)?",
        options: [
          { label: "Yes", value: 2, next: "12.2" },
          { label: "No", value: 0, next: "12.2" },
        ],
      },
      {
        id: "12.2",
        text: "Do you use multi-factor authentication and passkeys where available?",
        options: [
          { label: "Yes", value: 2, next: "12.3" },
          { label: "No", value: 0, next: "12.3" },
        ],
      },
      {
        id: "12.3",
        text: "Do you keep all your devices up to date with latest updates?",
        options: [
          { label: "Yes", value: 2, next: "12.4" },
          { label: "No", value: 0, next: "12.4" },
        ],
      },
      {
        id: "12.4",
        text: "Do you keep up to date with the latest types of scams and how to spot them?",
        options: [
          { label: "Yes", value: 2, next: null },
          { label: "No", value: 0, next: null },
        ],
      },
    ],
  },
];
