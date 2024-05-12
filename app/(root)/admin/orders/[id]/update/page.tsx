import UpdateForm from "@/components/shared/UpdateForm";
import { getOrderById } from "@/lib/actions/order.actions";
import { auth } from "@clerk/nextjs";

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const order = await getOrderById(id);
  console.log(order);
  console.log(order._id);

  return (
    <div className="wrapper">
      <UpdateForm order={order} orderId={order._id} />
    </div>
  );
};

export default UpdateEvent;
