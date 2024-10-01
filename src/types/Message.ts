export type Message = {
  id: number;
  text: string;
  sender: "user" | "seller";
};

export type Contact = {
  id: number;
  name: string;
  avatar: string;
  link: string;
}