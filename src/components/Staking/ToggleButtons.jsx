import React from 'react'
import './ToggleButtons.css'
const ToggleButtons = ({
  data,
  handleSelectedButton,
  name,
  defaultChecked,
  lockStakeType
}) => {
  return (
    <div className="flex-center">
      <ul className="tab">
        {data.map((item, index) => (
          <li
            key={`${item.value}-${index}`}
            className={item.tooltip ? 'tooltip' : ''}
          >
            <input
              key={index}
              id={`${name}-${item.value}-${index}`}
              checked={`${defaultChecked == item.value ? 'checked' : ''}`}
              value={item.value}
              type="radio"
              name={name}
              onChange={handleSelectedButton}
              disabled={lockStakeType || item.disabled}
            />
            <label
              htmlFor={`${name}-${item.value}-${index}`}
              className={`${
                lockStakeType || item.disabled ? ' ' : ' pointer '
              } ${defaultChecked == item.value ? 'checkedType' : ''}`}
            >
              {item.title}
            </label>
            {item.tooltip && (
              <span className="tooltip-text">{item.tooltip}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ToggleButtons
