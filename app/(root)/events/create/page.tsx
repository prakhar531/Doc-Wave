import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs";

const CreateEvent = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId;

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center pt-5">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Fill details
        </h3>
      </section>

      <div className="wrapper">
        <EventForm userId={userId} />
      </div>
    </>
  );
};

export default CreateEvent;
