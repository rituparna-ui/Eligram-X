interface _user {
  name: string;
  role: string;
  username: string;
  _id: string;
}

export interface PostReport {
  _id: string;
  author: _user;
  post: {
    _id: string;
    caption: string;
    photos: string[];
    author: string;
  };
  reportedBy: _user;
}
