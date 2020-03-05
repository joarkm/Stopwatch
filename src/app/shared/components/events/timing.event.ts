export enum TimingAction {
    START,
    STOP,
    PAUSE,
    RESUME
}

export interface TimingEvent {
    action: TimingAction;
    data?: {
        hours: string;
        minutes: string;
        seconds: string;
        precision: number;
    };
}

