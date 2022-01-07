declare namespace ReactNavigation {
  type ICarDTO = import('../../../dtos/ICarDTO').ICarDTO;

  export interface RootParamList {
    Home: undefined;
    CarDetails: { car: ICarDTO } | undefined;
    Scheduling: undefined;
    SchedulingDetails: undefined;
    SchedulingComplete: undefined;
  };
};
