export interface RobotStructure {
  name: string;
  url: string;
  id: number;
  stats: {
    speed: number;
    endurance: number;
    creationDate: Date;
  };
}

export interface UserCredentials {
  username: string;
  password: string;
}

export type RobotsStructure = RobotStructure[];
