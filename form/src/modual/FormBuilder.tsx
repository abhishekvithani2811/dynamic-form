import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { v4 as uuidv4 } from 'uuid';

interface Option {
  // option: string;
  text: string;
}

interface Question {
  question: string;
  type: string;
  options: Option[];
}

const DynamicForm = (): JSX.Element => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState<string>('');
  const [inputType, setInputType] = useState<string>('text');
  const [options, setOptions] = useState<Option[]>([]);
  const uniqueId = uuidv4();

  const navigate = useNavigate()
  const handleDeleteQuestion = (index: number): void => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };
  const handleAddQuestion = (): void => {
    setQuestions([...questions, { question: newQuestion, type: inputType, options, required: false }]);
    setNewQuestion('');
    setInputType('text');
    setOptions([{
      //  option: '', 
      text: ''
    }]);
  };

  const handleAddOption = (): void => {
    setOptions([...options, {
      // option: '',
      text: ''
    }]);
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      const response = await axios.post('http://localhost:5000/formData', { questions, uniqueId });

      if (response.status === 201) {
        toast.success(' data submit successfully ! 😊', {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        console.log('Data submitted successfully');
        // Clear form or show success message
      } else {
        toast.error(' error occur 😔', {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.error('Error submitting data');
        // Handle error case
      }
    } catch (error) {

      console.error('Error:', error);
      // Handle error case
    }
  };

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    let obj = { [name]: value }
  }



  const handleOptionChange = (index: number, key: string, value: string): void => {
    const updatedOptions: any[] = [...options];
    updatedOptions[index][key] = value;
    setOptions(updatedOptions);
  };


  return (
    <div >
      <div className=' text-white font-serif text-4xl  flex justify-center mt-10'>
        <h1>Dynamic Form Builder</h1>
      </div>
      <div className=' text-white font-sans text-md  flex justify-center items-center mt-10'>
        <h1><div className='flex justify-center '>Data Are Just Summaries Of Thousands Of Stories-tell, A Few Of Those Form To Help Make The Data Meaningful.</div></h1>
      </div>
      <div className=' text-white font-sans text-md mt-0 '>
        <h1><div style={{paddingLeft:"59%"}}>~ Dan Heath, bestselling author.</div></h1>
      </div>
      <div className='pt-10 '>
        <div className=' flex justify-center  '>
          <div className='first mx-10 flex justify-center w-6/12 bg1 pt-5'>
            <div className=' '>
              <div className='flex justify-center  mb-3  '>
                <input
                  style={{ width: "500px", height: "53px" }}
                  className=" pl-10 text-xl font-serif overflow-hidden enter_question"
                  type="text"
                  placeholder="Enter your question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                />
                <select style={{ width: "140px", height: "53px" }} className='ml-2 mt-2 p-3 w-full  font-serif text-lg text-stone-400 ' value={inputType} onChange={(e) => setInputType(e.target.value)}>
                  <option value="selectType" selected>Select Input Type</option>
                  <option value="text">Text</option>
                  <option value="textarea">Textarea</option>
                  <option value="radio" >Radio</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="email">Email</option>
                  <option value="number">Number</option>
                </select>
              </div>

              <div className=' flex justify-between'>


                <div>
                  {options.map((option, index) => (
                    <div key={index} className=' -ml-5'>
                      {['radio', 'checkbox'].includes(inputType) && (
                        <div className='flex mr-10'>
                          <input className='pl-10 font-serif'
                            type={inputType}
                            name={`option-${index}`}
                            value={option}
                            onChange={(e) => handleOptionChange(index, 'option', e.target.value)}
                          />
                          <input
                            style={{ width: "300px" }}
                            type="text"
                            className='ml-2 mt-1 w-full p-2.5 options pl-4 font-serif text-lg enter_question'
                            placeholder="Option Text"
                            value={option.text}
                            onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="">
                  {['radio', 'checkbox'].includes(inputType) && (
                    <button onClick={handleAddOption} className=' p-3 mt-3  mb-7  noselect add_option '>Add Option<AddCircleIcon className='mx-1 ' /></button>
                  )}
                </div>
              </div>
              <div className='p-3 mt-3  mb-10  noselect add_question flex justify-center'>
                <button onClick={handleAddQuestion}>Add Question</button>
              </div>
            </div>
          </div>
          {/* second */}
          <div className='mr-10 w-6/12 border1 '>
            <div className=' flex justify-center'>
              <h2 className=' font-serif text-2xl preview text-white '>Preview</h2>
            </div>
            <form>
              <div className=''>
                <div className='grid  place-items-center	'>
                  {questions.map((q, index) => {
                    return (
                      <div className='flex'>
                        <div key={index}>
                          <div className='question2 mt-7 '><h1 className='my-3 pl-2 text-2xl w-96'>Q.<label className='px-2 w-96 text-2xl mr-10 my-3 '>{q.question}</label></h1></div>
                          <div className='w-72 text-xl'>
                            {q.type === 'text' && <input type="text" onChange={handleOnchange} name='text1' className=' w-96 q2' placeholder='text' />}</div>
                          {q.type === 'number' && <input type="number" onChange={handleOnchange} name='text2' className=' w-96 q2' placeholder='number' />}
                          {q.type === 'email' && <input type="email" className='w-96 q2' placeholder='email' />}
                          {q.type === 'textarea' && <textarea className=' w-96 q2' placeholder='textarea' />}
                          {q.type === 'radio' && (
                            <div>
                              {q.options.map((option, oIndex) => (
                                <label key={oIndex}>
                                  <input type="radio" name={`question-${index}`} value={option} />
                                  {option.text}
                                </label>
                              ))}
                            </div>
                          )}
                          {q.type === 'checkbox' && (
                            <div>
                              {q.options.map((option, oIndex) => (
                                <label key={oIndex}>
                                  <input type="checkbox" className='mx-1' name={`question-${index}`} value={option} />
                                  {option.text}
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                        <span className='flex justify-end align-text-top mb-7 text-3xl '>
                          <button type="button" className="" onClick={() => handleDeleteQuestion(index)}>
                            <HighlightOffIcon className=' text-rose-800' />
                          </button>
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className=' flex mr-6 justify-center mt-4 mb-10'>

                <div className='add_question2 flex justify-items-center justify-center'><button type="button" className=' mr-3 ' onClick={handleSubmit}>

                  Submit
                </button></div>

                <div className=' flex justify-center'>
                  <div className='add_question3 flex justify-items-center justify-center ml-3'>
                    <button type="button" className='add_question3 ' onClick={() => navigate("/view")} >
                      view
                    </button>
                  </div>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DynamicForm;