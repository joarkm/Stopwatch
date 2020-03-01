export enum TimingAction {
    START,
    STOP,
    PAUSE,
    RESUME
}

export interface TimingEvent {
    action: TimingAction;
    state?: {
        hours: string;
        minutes: string;
        seconds: string;
    };
}

