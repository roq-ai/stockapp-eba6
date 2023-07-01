import { CommentInterface } from 'interfaces/comment';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface StockIdeaInterface {
  id?: string;
  idea: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  comment?: CommentInterface[];
  organization?: OrganizationInterface;
  _count?: {
    comment?: number;
  };
}

export interface StockIdeaGetQueryInterface extends GetQueryInterface {
  id?: string;
  idea?: string;
  organization_id?: string;
}
