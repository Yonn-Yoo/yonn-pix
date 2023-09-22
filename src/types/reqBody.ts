export type colorType =
  | 'black_and_white'
  | 'black'
  | 'white'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'purple'
  | 'magenta'
  | 'green'
  | 'teal'
  | 'blue'
  | null;

export type searchReqBodyType = {
  query: string;
  order_by?: 'latest' | 'relevant';
  color?: colorType;
};
