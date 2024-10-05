export const pages = {
  "/": "/",
  "/user": "/user",
  "/login": "/login",
  "/login/verify/[phone]": ({ phone }: { phone: string }) =>
    `/login/verify/${phone}`,
};

export const apies = {
  "/api/tiny-llama": "/api/tiny-llama",
  "/api/tiny-dolphin": "/api/tiny-dolphin",
  "/api/stream": "/api/stream",
  "/api/logout": "/api/logout",
  "/api/login/[phone]": ({ phone }: { phone: string }) => `/api/login/${phone}`,
  "/api/login/[phone]/verify/[code]": ({
    phone,
    code,
  }: {
    phone: string;
    code: string;
  }) => `/api/login/${phone}/verify/${code}`,
  "/api/ai/[...path]": ({ path }: { path: string[] }) =>
    `/api/ai/${path.join("/")}`,
};
