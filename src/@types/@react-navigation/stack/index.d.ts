declare namespace ReactNavigation {
  type ICarDTO = import('../../../dtos/ICarDTO').ICarDTO;
  type IMarkedDateProps = import('../../../components/Calendar').IMarkedDateProps;

  export interface RootParamList {
    Home: undefined;
    CarDetails: { car: ICarDTO } | undefined;
    Scheduling: { car: ICarDTO } | undefined;
    SchedulingDetails: { car: ICarDTO, dates: string[] } | undefined;
    SchedulingComplete: undefined;
  };
};
