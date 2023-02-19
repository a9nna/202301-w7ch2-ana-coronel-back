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

export type RobotsStructure = RobotStructure[];
