import React from "react";
import './InfoValue.css'

interface InfoValueProps {
  value: number;
  valueSuffix?: string;
  notFullWidth?: boolean;
  measure: string
}

const InfoValue: React.FC<InfoValueProps> = ({ valueSuffix, value, measure, notFullWidth}) => {
  return(
    <div className={`info-value-wrapper ${notFullWidth && 'not-full-width'}`}>
      <div className={'mobile-tags .text-primary'}>{value} {valueSuffix}</div>
      <div className={'mobile-tags text-tetriary'}>{measure}</div>
    </div>
  )
}

export default InfoValue