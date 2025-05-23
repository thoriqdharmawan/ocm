export interface CustomersType {
  id: number;
  code: string;
  image: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface CustomersDraftType {
  code?: string;
  image?: string | File | null;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}
