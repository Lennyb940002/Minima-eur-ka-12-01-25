export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  status: 'draft' | 'in-progress' | 'validated' | 'rejected';
  totalScore: number;
  tags: string[];
}

export interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Product) => void;
  initialData?: Partial<Product>;
}