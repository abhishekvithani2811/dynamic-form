import React, { useState } from 'react';

interface FormField {
  type: string;
  value: string;
}

const DynamicForm = (): JSX.Element => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [formFields, setFormFields] = useState<FormField[]>([]);

  const inputTypes: string[] = ['text', 'email', 'number'];

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const type: string = event.target.value;
    if (!selectedTypes.includes(type)) {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleFieldChange = (index: number, value: string): void => {
    const updatedFields: FormField[] = [...formFields];
    updatedFields[index].value = value;
    setFormFields(updatedFields);
  };

  const addField = (): void => {
    const selectedType: string = selectedTypes[selectedTypes.length - 1];
    setFormFields([...formFields, { type: selectedType, value: '' }]);
  };

  const removeField = (index: number): void => {
    const updatedFields: FormField[] = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // Process or submit formFields data as needed
    console.log(formFields);
  };

  return (
    <div>
      <h1>Dynamic Form Example</h1>
      <div>
        <label htmlFor="inputType">Select Input Type:</label>
        <select id="inputType" onChange={handleTypeChange}>
          <option value="" disabled>Select an input type</option>
          {inputTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <button onClick={addField}>Add Field</button>
      <form onSubmit={handleSubmit}>
        {formFields.map((field, index) => (
          <div key={index}>
            <label>{`Field ${index + 1} (${field.type}):`}</label>
            <input
              type={field.type}
              value={field.value}
              onChange={(event) => handleFieldChange(index, event.target.value)}
            />
            <button type="button" onClick={() => removeField(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="submit">Submit Form</button>
      </form>
    </div>
  );
};

export default DynamicForm;
// import React, { useState } from 'react'
// import '../App.css'
// function Home() {
//   // const [data, setData] = useState<any[]>([]);
//   const [formData, setFormData] = useState<{
//     length: any;
//     name: string;
//     email: string;
//     age: string;
//   }>({
//     name: '',
//     email: '',
//     age: '',
//     length: '',
//   });
//   const handleInputChange = (event:any) => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
//   // const [onEdit, setOnEdit] = useState<any[]>([]);
//   const addQuestion = (): void => {
//     const field: {
//       name: string,
//       label: string,
//       question_type: string,
//       list: any[]
//     } = {
//       "name": `question_${formData.length}`,
//       "label": "untitle_label",
//       "question_type": "short_answer",
//       "list": []
//     }
//     setFormData([...formData, field]);
//   }
//   // const editField = (fieldName: any, FieldLabel: any) => {
//   //   const formFields = [...data];
//   //   const fieldIndex: any = formFields.findIndex((f) => f.name == fieldName);
//   //   if (fieldIndex >= 0) {
//   //     formFields[fieldIndex].label = FieldLabel;
//   //     setData(formFields)
//   //   }
//   // }
//   return (
//     <div>
//       {/* first div */}
//       <div className='flex justify-center'>
//         <div className=' w-2/5 bg-slate-50 mt-10 first_box '>
//           <p className='mt-5 ml-4'><input type='text' className=' text-3xl text-zinc-950 h-12 bg-slate-50 untitle_form' placeholder='UNTITLE FROM' /></p>
//           <p className='mt-5 ml-4'><input type='text' className=' text-base mb-20 text-zinc-950  bg-slate-50 untitle_form' placeholder='From Description' /></p>
//           <div>{
//             data.map((field: any) => {
//               console.log(field)
//               return (
//                 <div>
//                   {/* {
//                     onEdit ? <input type='text' value={field.label} onChange={(e) => editField(field.name, e.target.value)} />
//                       :

//                       <div onClick={() => setOnEdit([true])}>{field.label}</div>
//                   } */}
//                   <div>
//                     <select>
//                       <option 
//                       type="number"
//                         id="age"
//                         name="age"
//                         value={formData.age}
//                         onChange={handleInputChange} 
//                         value="short_answer">Short Answer</option>
//                       <option value="paragraph">Paragraph</option>
//                       <option value="multichoice">Multichoice</option>
//                     </select>
//                   </div>
//                 </div>
//               )
//             })
//           }
//           </div>
//         </div>
//       </div>

//       {/* second div */}

//       <div className="buttons">
//         <button className="blob-btn" onClick={() => addQuestion()}>
//           Add Question
//           <span className="blob-btn__inner">
//             <span className="blob-btn__blobs">
//               <span className="blob-btn__blob"></span>
//               <span className="blob-btn__blob"></span>
//               <span className="blob-btn__blob"></span>
//               <span className="blob-btn__blob"></span>
//             </span>
//           </span>
//         </button>
//         <br />

//         <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
//           <defs>
//             <filter id="goo">
//               <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
//               <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix>
//               <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
//             </filter>
//           </defs>
//         </svg>
//       </div>
//     </div>
//   )
// }

// export default Home


// type FormData1 = {
//   // length: any;
//   name: string;
//   label: string;
//   question_type: string;
//   list: string[];
// }

// type form2 = FormData1 &{
//   firstName:string
// }


// interface FormData1 {
//   // length: any;
//   name: string;
//   label: string;
//   question_type: string;
//   list: string[];
// }

// interface FormData1 {

// }


// interface form1 extends FormData1 {
//   firstName: string
// }




// function Home() {
//   const [formData, setFormData] = useState<FormData1[]>([{
//     name: '',
//     label: '',
//     question_type: '',
//     list: []
//   }]);

//   const [formObjectData, setFormObjectData] = useState<FormData1>({
//     name: '',
//     label: '',
//     question_type: '',
//     list: []
//   });



//   const [formObjectData1, setFormObjectData1] = useState<form1>()


//   const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;

//     setFormObjectData({ ...formObjectData, [name]: value })

//   };

//   const addQuestion = (): void => {
//     const field: {
//       name: string;
//       label: string;
//       question_type: string;
//       list: any[];
//     } = {
//       name: `question_${formData?.length}`,
//       label: "untitle_label",
//       question_type: "short_answer",
//       list: [],
//     };

//     setFormData((prevData) => ([...prevData, field]));  
//   };


