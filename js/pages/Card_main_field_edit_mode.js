import React from 'react'
import Select from "react-select";
import {Card_main_field} from "./Card_main_field";
import {InputFloat} from "../elements/InputFloat";
import {InputInteger} from "../elements/InputInteger";
import {InputText} from "../elements/InputText";
import {InputDouble} from "../elements/InputDouble";

export class Card_main_field_edit_mode extends React.PureComponent {

    render() {
        console.log('rended Card_main_field_edit_mode');

        const {cardInfo, categoryFields, changeCardInfo} = this.props;

        const dealDirection = cardInfo.sale_type;
        const {fields} = data;


        return categoryFields.map(function (categoryField, i) {

            const field = fields[categoryField] || {};

            const field_direction = field[dealDirection] || {};

            const cardFieldValue = cardInfo[categoryField];

            if (field_direction.hide) return null; // Скрываем поле по запросу


            if (field_direction.type === 'range_double_text') {
                return (
                    <Card_main_field
                        key={i}
                        title={field.label}
                        value={
                            <InputDouble
                                className="w-48 p-1 border rounded"
                                defaultValue={cardFieldValue}
                                onblur={value => changeCardInfo({[categoryField]: value})}
                            />
                        }
                        show_in_one_line={true}
                    />
                )
            }
            else if (field_direction.type === 'select') {

                const {isMulti} = field_direction;

                const placeholder = dealDirection === 'object' ? 'Выбрать' : 'Неважно';

                const defaultValue = isMulti ?
                    field.options.filter(option => (cardFieldValue || '').split(',').includes(option.value)) :
                    field.options.find(option => option.value === cardFieldValue);


                return (
                    <Card_main_field
                        key={i}
                        title={field.label}
                        value={
                            <Select
                                styles={{
                                    ...selectStyleDefault
                                }}
                                isMulti={isMulti}
                                isClearable={!isMulti}
                                isSearchable={false}
                                className="w-100"
                                placeholder={placeholder}
                                options={field.options}
                                defaultValue={defaultValue}
                                onChange={el =>
                                    changeCardInfo({
                                        [categoryField]: el ?
                                            isMulti ?
                                                el.map(item => item.value).join(',') :
                                                el.value
                                            : null
                                    })
                                }
                            />
                        }
                        show_in_one_line={true}
                    />
                )
            }
            else if (field_direction.type === 'int') {
                return (
                    <Card_main_field
                        key={i}
                        title={field.label}
                        value={
                            <InputInteger
                                className="w-100 p-1 border rounded"
                                defaultValue={cardFieldValue}
                                onblur={value => changeCardInfo({[categoryField]: value})}
                            />
                        }
                        show_in_one_line={true}
                    />
                )
            }
            else if (field_direction.type === 'double') {
                return (
                    <Card_main_field
                        key={i}
                        title={field.label}
                        value={
                            <InputFloat
                                className="w-100 p-1 border rounded"
                                defaultValue={cardFieldValue}
                                onblur={value => changeCardInfo({[categoryField]: value})}
                            />
                        }
                        show_in_one_line={true}
                    />
                )
            }
            else if (field_direction.type === 'range_int') {
                return (
                    <Card_main_field
                        key={i}
                        title={field.label}
                        value={
                            <>
                                <InputInteger
                                    className="w-100 p-1 border rounded"
                                    placeholder="От"
                                    defaultValue={cardInfo[categoryField]}
                                    onblur={value => changeCardInfo({[categoryField]: value})}
                                />
                                <InputInteger
                                    className="w-100 p-1 border rounded"
                                    placeholder="До"
                                    defaultValue={cardInfo[categoryField + '_end']}
                                    onblur={value => changeCardInfo({[categoryField + '_end']: value})}
                                />
                            </>
                        }
                        show_in_one_line={true}
                    />
                )
            }
            else if (field_direction.type === 'range_double') {
                return (
                    <Card_main_field
                        key={i}
                        title={field.label}
                        value={
                            <>
                                <InputFloat
                                    className="w-100 p-1 border rounded"
                                    placeholder="От"
                                    defaultValue={cardInfo[categoryField]}
                                    onblur={value => changeCardInfo({[categoryField]: value})}
                                />
                                <InputFloat
                                    className="w-100 p-1 border rounded"
                                    placeholder="До"
                                    defaultValue={cardInfo[categoryField + '_end']}
                                    onblur={value => changeCardInfo({[categoryField + '_end']: value})}
                                />
                            </>
                        }
                        show_in_one_line={true}
                    />
                )
            }
            else return (
                    <Card_main_field
                        key={i}
                        title={field.label}
                        value={
                            <InputText
                                className="w-100 p-1 border rounded"
                                defaultValue={cardFieldValue}
                                onblur={value => changeCardInfo({[categoryField]: value})}
                            />
                        }
                        show_in_one_line={true}
                    />
                )

        })


    }
}