const mapping: Record<string, string> = {
  comments: 'comment',
  follows: 'follow',
  organizations: 'organization',
  'stock-ideas': 'stock_idea',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
