export interface CommentDTO {
  id?:         number;
  name:       string;
  email:      string;
  body:       string;
  postId?:     number;
}

export const CommentData: CommentDTO[] = [{
  id:         1,
  name:       'Rapheal',
  email:      'rapheal@gmail.com',
  body:       'loremlfekjhefvveve',
  postId:     2
},
{
  id:         5,
  name:       'Rapheal Loke',
  email:      'loeir@gmail.com',
  body:       'loremlfekjhefvveveffff',
  postId:     2
},
]

