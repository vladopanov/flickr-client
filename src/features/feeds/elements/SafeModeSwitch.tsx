import * as React from 'react';

interface IProps {
  isSafe: boolean;
  switchSafeMode: () => void;
}

export const SafeModeSwitch = (props: IProps) =>
  <div>
    <span>Turn {props.isSafe ? 'off' : 'on'} safe mode: </span>
    <label className='switch'>
      <input type='checkbox'
        checked={props.isSafe}
        onChange={props.switchSafeMode}
      />
      <span className='slider round'></span>
    </label>
  </div>;