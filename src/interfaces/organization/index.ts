import { FollowInterface } from 'interfaces/follow';
import { StockIdeaInterface } from 'interfaces/stock-idea';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  follow?: FollowInterface[];
  stock_idea?: StockIdeaInterface[];
  user?: UserInterface;
  _count?: {
    follow?: number;
    stock_idea?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
