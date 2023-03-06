export enum PaymentMethod {
    cash = 'cash',
    translation = 'kaspi_translation',
    payment = 'kaspi_payment',
    otherbank = 'otherbank'
}

export enum Source {
    instagram = 'instagram',
    OLX = 'OLX',
    satu = 'satu',
    market = 'market',
    webSite = 'web_site',
    contactPerson = 'contact_person',
    kaspiShop = 'kaspi_shop',
    kaspiAds = 'kaspi_ads'
}

export enum Status {
    open = 'open',
    success = 'success',
    reject = 'reject',
    onDelivery = 'on_delivery',
    refund = 'refund',
    reorder = 'reorder',
    wrong = 'wrong',
    test = 'test'
}

export enum DeliveryType {
    courier = 'courier',
    teamMember = 'team_member',
    handToHand = 'hand_to_hand'
}
