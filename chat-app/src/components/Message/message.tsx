interface MessageI {
  senderName: string;
  messageContent: string;
  date: string
  isClient: boolean;
}

const senderStyledClassTailwind = {
  container: "col-start-6 col-end-13 p-3 rounded-lg",
  picture: "flex items-center justify-start flex-row-reverse",
  content: "relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl",
};

export function Message({ senderName, date, messageContent, isClient }: MessageI) {
  return (
    <div
      className={
        isClient
          ? senderStyledClassTailwind.container
          : "col-start-1 col-end-8 p-3 rounded-lg"
      }
    >
      <div
        className={
          isClient
            ? senderStyledClassTailwind.picture
            : "flex flex-row items-center"
        }
      >
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          {senderName[0]}
        </div>
        <div
          className={
            isClient
              ? senderStyledClassTailwind.content
              : "relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
          }
        >
          <div>{`${messageContent} ${date}`}</div>
        </div>
      </div>
    </div>
  );
}
