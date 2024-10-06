/* eslint-disable react/jsx-no-constructed-context-values */
import { ReactNode, useContext } from 'react';
import { CheckboxContext } from '@/contexts/CheckBoxContext';

type CheckboxItemProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  value: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void; // 체크상태라면 담기, 체크박스 1개 쓸때만 사용
};
type CheckboxGroupProps = {
  children: ReactNode;
  className?: string;
  values: string[]; // 선택된 값을 담을 배열
  disabled?: boolean;
  onChange: (values: string[]) => void;
  label?: string;
  // name?: string;
};

// checkbox 1개
function CheckBoxItem({
  children,
  disabled,
  value,
  checked,
  onChange,
  className,
}: CheckboxItemProps) {
  const context = useContext(CheckboxContext);

  if (!context) {
    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label className={className}>
        <input
          type="checkbox"
          disabled={disabled}
          checked={checked}
          // eslint-disable-next-line @typescript-eslint/no-shadow
          onChange={({ target: { checked } }) => onChange && onChange(checked)} // context가 없을때는 onChange를 꼭 써야함
          className="hidden peer"
        />
        {children}
      </label>
    );
  }

  const { isDisabled, isChecked, toggleValue } = context;

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={className}>
      <input
        type="checkbox"
        disabled={disabled && isDisabled(disabled)}
        checked={isChecked(value)}
        // eslint-disable-next-line @typescript-eslint/no-shadow
        onChange={({ target: { checked } }) => toggleValue({ checked, value })}
        className="hidden peer"
      />
      {children}
    </label>
  );
}

// checkboxGroup으로 묶여 있는 애들 중 어떤 애가 체크되어 있는지 확인

function CheckBoxGroup({
  label,
  children,
  disabled: groupDisabled,
  values,
  onChange,
  className,
}: CheckboxGroupProps) {
  const isDisabled = (disabled: boolean) => !!(disabled || groupDisabled); // 개별 item이 disabled인지 확인하는 변수
  const isChecked = (value: string) => values.includes(value);
  // checked 상태라면 onChange에 value를 추가하고, 아니라면 value를 제거
  const toggleValue = ({
    checked,
    value,
  }: {
    checked: boolean;
    value: string;
  }) => {
    const currentValues = Array.isArray(values) ? values : [];
    if (checked) {
      onChange(currentValues.concat(value));
    } else {
      onChange(currentValues.filter((v) =>{return v !== value}));
    }
  };

  return (
    <fieldset className={className}>
      <legend>{label}</legend>
      <CheckboxContext.Provider value={{ isDisabled, isChecked, toggleValue }}>
        {children}
      </CheckboxContext.Provider>
    </fieldset>
  );
}

const CheckBox = {
  Group: CheckBoxGroup,
  Item: CheckBoxItem,
};

export default CheckBox;
