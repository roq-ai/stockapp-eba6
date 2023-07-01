import { UserInterface } from 'interfaces/user';
import { StockIdeaInterface } from 'interfaces/stock-idea';
import { GetQueryInterface } from 'interfaces';

export interface CommentInterface {
  id?: string;
  comment: string;
  user_id: string;
  stock_idea_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  stock_idea?: StockIdeaInterface;
  _count?: {};
}

export interface CommentGetQueryInterface extends GetQueryInterface {
  id?: string;
  comment?: string;
  user_id?: string;
  stock_idea_id?: string;
}
