import React, { useState } from 'react';
import { Upload, X, AlertCircle } from 'react-feather';
import * as XLSX from 'xlsx';
import { toast } from 'react-hot-toast';

const TIME_SLOTS = generateTimeSlots('09:00', '16:40', 40); // 40-minute intervals

const TimeTableUpload = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [processing, setProcessing] = useState(false);

  const processTimeTable = async (file) => {
    setProcessing(true);
    try {
      const data = await readExcelFile(file);
      const schedule = parseTimeTable(data);
      onUpload(schedule);
      toast.success('Timetable processed successfully');
    } catch (error) {
      toast.error('Error processing timetable: ' + error.message);
    } finally {
      setProcessing(false);
    }
  };

  const readExcelFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const workbook = XLSX.read(e.target.result, { type: 'binary' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const data = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
          resolve(data);
        } catch (error) {
          reject(new Error('Invalid file format'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsBinaryString(file);
    });
  };

  const parseTimeTable = (data) => {
    if (!data || data.length < 3) {
      throw new Error('Invalid timetable format');
    }

    // Extract time slots from first row
    const timeSlots = data[0].slice(1);
    
    // Process availability for different year students
    const firstYearSlots = processYearSlots(data[1].slice(1));
    const otherYearSlots = processYearSlots(data[2].slice(1));

    // Combine and determine free slots
    return TIME_SLOTS.map((time, index) => {
      const firstYearBusy = firstYearSlots[index];
      const otherYearsBusy = otherYearSlots[index];

      return {
        time,
        isAvailable: !firstYearBusy && !otherYearsBusy,
        firstYearClass: firstYearBusy,
        otherYearsClass: otherYearsBusy,
        maxStudents: 3, // Default max students before marking as busy
        currentStudents: 0,
        manualOverride: false
      };
    });
  };

  const processYearSlots = (rowData) => {
    return rowData.map(cell => Boolean(cell && cell.toString().trim()));
  };

  // Event handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (isValidFileType(file)) {
      setSelectedFile(file);
      await processTimeTable(file);
    } else {
      toast.error('Please upload a valid Excel or CSV file');
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file && isValidFileType(file)) {
      setSelectedFile(file);
      await processTimeTable(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    onUpload(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Timetable Upload</h2>
      
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          dragActive ? 'border-red-500 bg-red-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {processing ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500" />
            <span className="ml-2 text-gray-600">Processing timetable...</span>
          </div>
        ) : selectedFile ? (
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
            <div className="flex items-center">
              <Upload className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-700">{selectedFile.name}</span>
            </div>
            <button
              onClick={handleRemoveFile}
              className="text-gray-400 hover:text-red-500"
              aria-label="Remove file"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <>
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">
              Drag and drop your timetable file here, or
              <label className="text-red-500 hover:text-red-600 cursor-pointer ml-1">
                browse
                <input
                  type="file"
                  className="hidden"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileSelect}
                />
              </label>
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Supports Excel and CSV files
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                <div className="text-left text-sm text-blue-700">
                  <p className="font-medium mb-1">Expected Format:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Row 1: Time slots (9 AM - 4:40 PM)</li>
                    <li>Row 2: 1st year class schedule</li>
                    <li>Row 3: 2nd-4th year class schedule</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Utility functions
function generateTimeSlots(start, end, intervalMinutes) {
  const slots = [];
  const startTime = new Date(`2000-01-01 ${start}`);
  const endTime = new Date(`2000-01-01 ${end}`);

  while (startTime <= endTime) {
    slots.push(
      startTime.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      })
    );
    startTime.setMinutes(startTime.getMinutes() + intervalMinutes);
  }
  return slots;
}

function isValidFileType(file) {
  return file && (
    file.type === "application/vnd.ms-excel" || 
    file.type === "text/csv" || 
    file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
}

export default TimeTableUpload; 