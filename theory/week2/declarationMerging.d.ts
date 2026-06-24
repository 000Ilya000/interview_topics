//! DECLARATION MERGING

interface Box {
  width: number;
}

interface Box {
  height: number;
}

// declare module "express" { interface Request { userId?: string } }
// declare global { interface Window { myApp: { version: string } } }

export {};
