
export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'city' | 'attraction' | 'tour';
  distanceKm: number;
}

export interface UserFollowing {
  followerId: string;
  followingId: string;
  timestamp: string;
}

export interface FollowState {
  isFollowing: boolean;
  canMessage: boolean;
}
