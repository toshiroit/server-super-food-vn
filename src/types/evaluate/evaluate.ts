export type EvaluateData = {
  code_evaluate: string;
  code_user: string;
  code_product: string;
  evaluate_product: number;
  evaluate_ship: number;
  evaluate_progress: number;
  images: ImageEvaluate[] | null;
  text: string;
  createdAt: string;
  code_order: string;
};

export type ImageEvaluate = {
  code: string;
  url: string;
};
export type EvaluateCheck = {
  code_user: string;
  code_product: string;
  code_order: string;
};
