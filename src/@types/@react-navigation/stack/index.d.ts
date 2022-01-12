declare namespace ReactNavigation {
  type ICarDTO = import('../../../dtos/ICarDTO').ICarDTO;
  type IMarkedDateProps = import('../../../components/Calendar').IMarkedDateProps;
  type ISignUpSecondStepParams = import('../../../screens/SignUp/SignUpSecondStep').ISignUpSecondStepParams;

  export interface RootParamList {
    SignIn: undefined;
    SignUpFirstStep: undefined;
    SignUpSecondStep: ISignUpSecondStepParams;
    Home: undefined;
    MyCars: undefined;
    CarDetails: { car: ICarDTO } | undefined;
    Scheduling: { car: ICarDTO } | undefined;
    SchedulingDetails: { car: ICarDTO, dates: string[] } | undefined;
    SchedulingComplete: undefined;
  };
};
