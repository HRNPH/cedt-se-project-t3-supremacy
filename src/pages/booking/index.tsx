import { api } from "~/utils/api";
import Page from "../layout/page";
import { useSession } from "next-auth/react";
import { type Application } from "../companies/[companyId]";
import { Fragment, SetStateAction, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

export default function Bookings() {
  const sessionId = useSession().data?.user.id ?? "NO_OP";
  const { data: applications } =
    api.application.getApplicationsForUser.useQuery(sessionId);
  const { data: adminapplications } =
    api.application.getAllApplications.useQuery();
  const { data } = api.user.getUserById.useQuery(sessionId);
  const { mutate } = api.application.updateApplicationReservedAt.useMutation();
  const applicationsData: Application[] = applications ?? [];
  const applicationsDataAdmin: Application[] = adminapplications ?? [];
  const [open, setOpen] = useState(false);
  const [openedit, setOpenedit] = useState(false);
  const cancelButtonRef = useRef(null);
  const [applicationId, setapplicationId] = useState("");
  const {
    mutate: deleteApplication,
    isSuccess,
    isError,
  } = api.application.deleteApplication.useMutation();

  const handleClickDelete = (applicationId: SetStateAction<string>) => () => {
    setapplicationId(applicationId);
    setOpen(true);
  };

  const handleClickEdit = (applicationId: SetStateAction<string>) => () => {
    setapplicationId(applicationId);
    setOpenedit(true);
  };

  const handleEditInterview = () => {
    const meetingTimeInput = document.getElementById(
      "meeting-time",
    ) as HTMLInputElement | null;

    if (!meetingTimeInput?.value) {
      toast.error("Please select a date and time for the interview.");
      return;
    }

    if (!sessionId) {
      toast.error("You must be logged in to schedule an interview.");
      return;
    }

    mutate(
      {
        applicationId: applicationId,
        newReservedAt: meetingTimeInput.value,
      },
      {
        onSuccess: () => {
          setOpen(false);
          window.parent.location = window.parent.location.href;
        },
        onError: () => {
          toast.error("Failed to schedule the interview. Please try again.");
        },
      },
    );
  };

  const handleDelete = () => {
    deleteApplication(
      { applicationId },
      {
        onSuccess: () => {
          setOpen(false);
          window.parent.location = window.parent.location.href;
        },
        onError: (error) => {
          toast.error("Failed to delete application. Please try again.");
        },
      },
    );
  };

  return (
    <div className="bg-gray-50">
      <Page>
        <div className="mx-5 max-w-screen-xl text-2xl xl:mx-auto">
          <div className="mx-auto mt-10">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
              <div className="broder-gray-50 border-b px-4 py-6 sm:px-6">
                <h3 className="text-xl font-semibold leading-7 text-gray-900">
                  Booking
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  Here is your booking. You have the option to edit or delete
                  it. Feel free to make any changes before being selected for an
                  interview!
                </p>
              </div>
              {data?.role === "admin" ? (
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 p-10 pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                  {applicationsDataAdmin?.map((job) => (
                    <article
                      key={job.id}
                      className="flex max-w-xl flex-col items-start justify-between"
                    >
                      <div className="flex items-center gap-x-4 rounded-full bg-gray-100 p-1 px-3 text-xs">
                        {job.jobListing.type}
                      </div>
                      <div className="group relative">
                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                          <span className="absolute inset-0" />
                          {job.jobListing.title}
                        </h3>
                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                          {job.jobListing.description}
                        </p>
                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                          {job.reservedAt}
                        </p>
                      </div>
                      <div className="text-sm">
                        <button
                          className="mt-5 rounded-md bg-gray-200 p-1 px-6 font-semibold text-black hover:bg-gray-300"
                          onClick={handleClickEdit(job.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="ml-2 mt-5 rounded-md bg-red-600 p-1 px-6 font-semibold text-white hover:bg-red-700"
                          onClick={handleClickDelete(job.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 p-10 pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                  {applicationsData?.map((job) => (
                    <article
                      key={job.id}
                      className="flex max-w-xl flex-col items-start justify-between"
                    >
                      <div className="flex items-center gap-x-4 rounded-full bg-gray-100 p-1 px-3 text-xs">
                        {job.jobListing.type}
                      </div>
                      <div className="group relative">
                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                          <span className="absolute inset-0" />
                          {job.jobListing.title}
                        </h3>
                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                          {job.jobListing.description}
                        </p>
                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                          {job.reservedAt}
                        </p>
                      </div>
                      <div className="text-sm">
                        <button
                          className="mt-5 rounded-md bg-gray-200 p-1 px-6 font-semibold text-black hover:bg-gray-300"
                          onClick={handleClickEdit(job.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="ml-2 mt-5 rounded-md bg-red-600 p-1 px-6 font-semibold text-white hover:bg-red-700"
                          onClick={handleClickDelete(job.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Page>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Confirm Booking Cancellation
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you certain you want to cancel this booking?
                          Please be aware that this action will permanently
                          erase the booking details from our system and cannot
                          be reversed.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={openedit} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenedit}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Schedule Your Interview
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Please pick a suitable date and time for your job
                        interview from the calendar below.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center pt-5">
                    <input
                      type="datetime-local"
                      id="meeting-time"
                      name="meeting-time"
                      min="2022-05-10T00:00"
                      max="2022-05-13T23:59"
                    />
                  </div>

                  <div className="mt-5 sm:mt-6">
                    <button
                      onClick={handleEditInterview}
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Confirm Schedule Interview
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
