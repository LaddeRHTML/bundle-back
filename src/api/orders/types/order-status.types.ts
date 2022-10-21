export type OrderStatus =
    | 'first-call'
    | 'delivered'
    | 'call-from-client'
    | 'message-from-client'
    | 'on-pause'
    | 'unknown'
    | 'in process'
    | 'undelivered';
