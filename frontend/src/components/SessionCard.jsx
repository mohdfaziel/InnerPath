import { formatDate, getDisplayName } from '../utils/helpers';

const SessionCard = ({ session, showAuthor = true, onEdit = null, onDelete = null }) => {
  const { title, tags, json_file_url, status, author, created_at, updated_at } = session;

  const statusColor = status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 pr-2">{title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor} flex-shrink-0`}>
          {status}
        </span>
      </div>
      
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium">JSON URL:</span>
        </p>
        <a
          href={json_file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-700 text-sm break-all"
        >
          {json_file_url}
        </a>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div>
          {showAuthor && author && (
            <p className="mb-1">By: {getDisplayName(author)}</p>
          )}
          <p>Created: {formatDate(created_at)}</p>
          {updated_at !== created_at && (
            <p>Updated: {formatDate(updated_at)}</p>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2 sm:gap-0">
          {onEdit && (
            <button
              onClick={() => onEdit(session)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-xs sm:text-sm transition-colors w-full sm:w-auto"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(session)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs sm:text-sm transition-colors w-full sm:w-auto"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
