const commitlintConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // 한글 커밋 메시지와 고유명사(Next.js 등)를 허용
    "subject-case": [0],
  },
};

export default commitlintConfig;
