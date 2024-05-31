import { Order, OrderStatus } from '../../../../redux/order_reduer/types';
import './Status.css'

interface StatusProps {
    status: OrderStatus;
    // order: Order;
  }

const StatusTitle: Record<OrderStatus, string> = {
    'Создан': '',
    'Принят': 'Оплата ожидается',
    'Изменен и принят': 'Оплата ожидается',
    'Оплачен': 'Счёт оплачен',
    'Отменен': 'Отменён'
}

const StatusClass: Record<OrderStatus, string> = {
    'Создан': '',
    'Принят': 'expected',
    'Изменен и принят': 'expected',
    'Оплачен': 'paid',
    'Отменен': 'canceled'
}

const Status = (props: StatusProps) => {
    return (
        <div className={`${StatusClass[props.status]} tags-text`}>
            {StatusTitle[props.status]}
        </div>
    );
}

export default Status