import React, { useState } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as Edit } from "assets/images/edit.svg";
import { ReactComponent as Trash } from "assets/images/trash.svg";
import { Todo, status, importance } from "todo/TodoService";

const statusRank = [status.PENDING, status.ONGOING, status.COMPLETED];
const impotantRank = [importance.LOW, importance.MID, importance.HIGH];

interface TodoItemProps {
  changeStatus: (todo: Todo) => void;
  removeTodo: (id: number) => void;
  todo: Todo;
}

export default function TodoItem({
  changeStatus,
  removeTodo,
  todo,
}: TodoItemProps) {
  const [isModify, setIsModify] = useState(false);
  const [form, setForm] = useState<Todo>(todo);

  const hadleEdit = (id: number): void => {
    setIsModify(true);
    setForm(todo);
  };

  const handleRemove = (id: number): void => removeTodo(id);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prev: Todo) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatus = (status: any) => {
    setForm((prev: Todo) => ({
      ...prev,
      status,
    }));
  };

  const handleSubmit = (): void => {
    changeStatus({
      ...form,
      importance: form.importance,
    });
    setIsModify(false);
  };

  return (
    <Container isModify={isModify}>
      <TaskBox>
        <TaskTitleBox>
          <ImfortanceStatus>{todo.importance}</ImfortanceStatus>
          <ImfortanceBox>
            {isModify && (
              <select
                name="importance"
                value={form.importance}
                onChange={handleChange}
              >
                {impotantRank.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            )}
          </ImfortanceBox>
          {!isModify ? (
            <Text>{todo.task}</Text>
          ) : (
            <TaskInput name="task" value={form.task} onChange={handleChange} />
          )}
        </TaskTitleBox>
        <StatusBox>
          {isModify ? (
            statusRank.map((status) => (
              <Status
                key={status}
                isModify={isModify}
                isStatus={status}
                currentStatus={form.status}
                onClick={() => handleStatus(status)}
              >
                {status}
              </Status>
            ))
          ) : (
            <Status isModify={isModify} isStatus={todo.status}>
              {todo.status}
            </Status>
          )}
        </StatusBox>
      </TaskBox>
      {!isModify ? (
        <div>
          <ModifyButton onClick={() => hadleEdit(todo.id)}>
            <Edit />
          </ModifyButton>
          <DeleteButton onClick={() => handleRemove(todo.id)}>
            <Trash />
          </DeleteButton>
        </div>
      ) : (
        <ButtonBox>
          <ConformButton onClick={handleSubmit}>확인</ConformButton>
          <CancleButton onClick={() => setIsModify(false)}>취소</CancleButton>
        </ButtonBox>
      )}
    </Container>
  );
}

const Container = styled.div<{ isModify: boolean }>`
  ${({ theme }) => theme.flexSet("space-between")};
  width: 100%;
  height: 55px;
  min-height: ${({ isModify }) => (isModify ? "90px" : "70px")};
  margin: 10px 0;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  transition: 0.3s;
`;

const TaskTitleBox = styled.div`
  ${({ theme }) => theme.flexSet("flex-start")};
`;

const ImfortanceStatus = styled.div`
  margin: 2px 6px 0 0;
`;

const TaskBox = styled.div`
  ${({ theme }) => theme.flexSet("space-between", "", "column")};
  height: 100%;
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const TaskInput = styled.input`
  font-size: 18px;
  font-weight: 500;
  padding-left: 5px;
`;

const ImfortanceBox = styled.div`
  ${({ theme }) => theme.flexSet("flex-start")};
`;

const StatusBox = styled.div`
  ${({ theme }) => theme.flexSet("flex-start")};
`;

const Status = styled.div<{
  isModify: boolean;
  isStatus: string;
  currentStatus?: string;
}>`
  ${({ theme }) => theme.flexSet()};
  max-width: 80px;
  margin: 6px 6px 0 0;
  padding: 2px 4px 4px;
  color: rgb(230 32 32);
  border: 1px solid rgb(230 32 32);
  border-radius: 3px;

  ${({ isModify, isStatus, currentStatus }) => {
    if (isModify) {
      if (isStatus === "pending" && isStatus === currentStatus) {
        return css`
          color: white;
          cursor: pointer;
          border: green;
          background-color: green;
        `;
      }
      if (isStatus === "ongoing" && isStatus === currentStatus) {
        return css`
          color: white;
          cursor: pointer;
          border: yellow;
          background-color: yellow;
        `;
      }
      if (isStatus === "completed" && isStatus === currentStatus) {
        return css`
          color: white;
          cursor: pointer;
          border: red;
          background-color: red;
        `;
      }
    }
  }})
`;

const ModifyButton = styled.button`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  fill: rgb(183 183 183);
  cursor: pointer;

  &:hover {
    fill: rgb(40 40 40);
  }
`;

const DeleteButton = styled.button`
  width: 20px;
  height: 20px;
  fill: rgb(183 183 183);

  cursor: pointer;

  &:hover {
    fill: rgb(230 32 32);
  }
`;

const ButtonBox = styled.div`
  ${({ theme }) => theme.flexSet("flex-end", "flex-end")};
  height: 100%;
  cursor: pointer;
`;

const ConformButton = styled.button`
  ${({ theme }) => theme.flexSet()};
  height: 38px;
  width: 70px;
  border-radius: 5px;
  padding: 10px;
  color: white;
  background-color: hsl(
    190.7142857142857,
    75.67567567567568%,
    29.01960784313725%
  );
  opacity: 0.5;
`;

const CancleButton = styled(ConformButton)`
  margin-left: 6px;
  background-color: rgb(216, 227, 231);
  color: gray;
`;
