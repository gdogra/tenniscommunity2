export interface Player {
  name: string;
  match_wins: number;
  match_losses: number;
  match_win_pct: number;
  game_win_pct: number;
  area: string;
  createdAt?: FirebaseFirestore.FieldValue;
  updatedAt?: FirebaseFirestore.FieldValue;
}

export interface Match {
  winner: string;
  opponent: string;
  sets: string[];
  date: string; // "YYYY-MM-DD"
  createdAt?: FirebaseFirestore.FieldValue;
  updatedAt?: FirebaseFirestore.FieldValue;
}
