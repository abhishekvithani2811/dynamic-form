import  { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function FormBuilderComponent() {
  const [formComponents, setFormComponents] = useState<any[]>([]);
  const [formResponse, setFormResponse] = useState<any>({});

  interface FormComponent {
    question: string;
    inputType: string;
  }

  useEffect(() => {
    axios.get<FormComponent[]>('http://localhost:5000/formData')
      .then(response => {
        console.log("response--", response.data)
        setFormComponents(response.data);
      })
      .catch(error => {
        console.error('Error fetching form data:', error);
      });
  }, []);

  const handleInputChange = (index: any, value: any) => {
    console.log(value, "--value");
    const updateFormResponse = { ...formResponse };
    console.log(updateFormResponse);
    console.log({ index })
    updateFormResponse[index] = value;
    setFormResponse(updateFormResponse);
  };
  const handelFormSubmit = async () => {
    try {
      const response = await axios.post(
        "https://38ff-14-194-132-174.ngrok-free.app/Formresponse",
        formResponse
      );
      console.log(formResponse.data)
      if (formResponse) {
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
      // console.log("Form data submitted success ", response.data);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };
  const handleRadioChange = (index: any, option: string) => {

    handleInputChange(index, option);
  };
  const handleChackboxChange = (index1: number, selectedOption: any) => {
    // console.log(index1, "-----index1")
    const updatedOptions = formResponse[index1] || []; // Existing selected options or empty array
    const updatedOptionsSet = new Set(updatedOptions);

    if (updatedOptionsSet.has(selectedOption)) {
      updatedOptionsSet.delete(selectedOption);
    } else {
      updatedOptionsSet.add(selectedOption);
    }
    handleInputChange(index1, Array.from(updatedOptionsSet));
  };
  return (
    <div className="flex items-center justify-center min-h-screen " >
      <div className="bg-[#e4f1f8] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center  mb-6" style={{ color: "#1F6A8A" }}>
          Dynamic Form
        </h1>
        {formComponents.map((data, dataIndex) => {
          return (
            <div key="dataIndex" className="mb-4">
              {data.questions.map((data1: any, data1Index: number) => {
                // console.log(data1.question)
                return (
                  <div key={data1Index}>
                    <label className="block font-medium text-gray-700 mb-2">
                      <span className=' text-xl'> Q</span> {data1Index + 1}.<span className=' text-lg font-serif'> {data1.question}</span>
                    </label>
                    {data1.type === 'text' && (
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        onChange={(e) =>
                          handleInputChange(data1.question, e.target.value)
                        }
                      />
                    )}
                    {(data1.type === 'checkbox') && (
                      <div className="space-y-2">
                        {data1.options.map((data2: any, data2Index: number) => (
                          <label
                            key={data2Index}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type={data1.type}
                              className="form-checkbox h-5 w-5"
                              name={dataIndex}
                              onChange={() =>
                                handleChackboxChange(data1.question, data2)
                              }
                            />
                            <span>{data2.text}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    {(data1.type === 'radio') && (
                      <div className="space-y-2">
                        {data1.options.map((data2: any, data2Index: number) => (
                          <label
                            key={data2Index}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type={data1.type}
                              name="a"
                              className="form-checkbox h-5 w-5"
                              onChange={() =>
                                handleRadioChange(data1.question, data2)
                              }
                            />
                            <span>{data2.text}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    {data1.type === 'textarea' && (
                      <textarea
                        rows={4}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        onChange={(e) =>
                          handleInputChange(data1.question, e.target.value)
                        }
                      ></textarea>
                    )}
                    {data1.type === 'email' && (
                      <input
                        type="email"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        onChange={(e) =>
                          handleInputChange(data1.question, e.target.value)
                        }
                      />
                    )}
                    {data1.type === 'number' && (
                      <input
                        type="number"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        onChange={(e) =>
                          handleInputChange(data1.question, e.target.value)
                        }
                      />
                    )}
                  </div>
                )
              })}

            </div>
          )
        })}
        <div className="text-center">
          <button className=" submitdata text-lg font px-4 py-2 rounded-md " onClick={handelFormSubmit}>
            submit
          </button>

        </div>
      </div>
      <ToastContainer />

    </div>
  );
}

export default FormBuilderComponent;
