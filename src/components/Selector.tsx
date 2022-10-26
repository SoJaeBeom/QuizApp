import { MouseEvent, useState } from "react";
import styled from "styled-components";
import { ISelectSetting, IFilterList } from "../types/SelectorTypes";

type SelectProps = {
  props: IFilterList[];
  selectSetting: ISelectSetting;
  setSelectSetting: React.Dispatch<React.SetStateAction<ISelectSetting>>;
};

const Selector = ({ props, selectSetting, setSelectSetting }: SelectProps) => {
  let initValue = "";
  if (props[0].filterKey === "카테고리") {
    initValue = "카테고리를 선택하세요!";
  } else if (props[0].filterKey === "난이도") {
    initValue = "난이도를 선택하세요!";
  } else if (props[0].filterKey === "개수") {
    initValue = "문제 개수를 선택하세요!";
  }

  const [currentValue, setCurrentValue] = useState(initValue);
  const [showOptions, setShowOptions] = useState(false);

  const handleOnChangeSelectValue = (event: MouseEvent<HTMLLIElement>) => {
    const newTarget = event.target as HTMLLIElement;

    if (newTarget.id === "카테고리") {
      setSelectSetting({
        ...selectSetting,
        category: newTarget.innerText,
      });
    } else if (newTarget.id === "난이도") {
      setSelectSetting({
        ...selectSetting,
        difficulty: newTarget.innerText,
      });
    } else if (newTarget.id === "개수") {
      setSelectSetting({
        ...selectSetting,
        amount: newTarget.innerText,
      });
    }
    setCurrentValue(newTarget.innerText);
    setShowOptions(false);
  };

  return (
    <SelectBox
      onMouseLeave={() => setShowOptions(false)}
      onMouseOver={() => setShowOptions(true)}
    >
      <Label>{currentValue}</Label>
      <SelectOptions className={showOptions ? "show" : "hide"}>
        {props.map((data, index) => (
          <Option
            id={data.filterKey}
            key={index}
            value={data.value}
            onClick={handleOnChangeSelectValue}
          >
            {data.value}
          </Option>
        ))}
      </SelectOptions>
    </SelectBox>
  );
};

export default Selector;

const SelectBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;

  background-color: #ffffff;
  align-self: center;
  cursor: pointer;

  &::before {
    content: "⌵";
    position: absolute;
    top: 0;
    right: 0.5vw;
    font-size: 1.5vw;
  }
`;

const Label = styled.label`
  font-size: 1.5vw;
  margin-right: 1vw;
  text-align: center;
`;

const SelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  top: 4vh;
  left: 0;
  width: 100%;
  overflow: hidden;
  max-height: ${props => (props.className === "show" ? "none" : "0")};
  padding: 0;
  background-color: white;
  color: black;
`;

const Option = styled.li`
  font-size: 1vw;
  padding: 6px 8px;
  border: 1px solid;
  text-align: center;
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: #595959;
  }
`;
