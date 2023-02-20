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
  userName: string;
  password: string;
}

export type RobotsStructure = RobotStructure[];
